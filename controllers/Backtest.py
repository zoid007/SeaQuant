import seaborn as sns
import matplotlib.pyplot as plt
import yfinance as yf
import lib
import json
plt.rcParams['figure.figsize'] = [20, 12]

import pandas as pd
import pandas_ta as ta
from tqdm import tqdm
import numpy as np

class Order():
    def __init__(self, ticker, size, side, idx, limit_price=None, order_type='market'):
        self.ticker = ticker
        self.side = side
        self.size = size
        self.type = order_type
        self.limit_price = limit_price
        self.idx = idx
        
class Trade():
    def __init__(self, ticker,side,size,price,type,idx):
        self.ticker = ticker
        self.side = side
        self.price = price
        self.size = size
        self.type = type
        self.idx = idx
    def __repr__(self):
        return f'<Trade: {self.idx} {self.ticker} {self.size}@{self.price}>'

class Strategy():
    def __init__(self):
        self.current_idx = None
        self.data = None
        self.cash = None
        self.orders = []
        self.trades = []
    
    def buy(self,ticker,size=1):
        self.orders.append(
            Order(
                ticker = ticker,
                side = 'buy',
                size = size,
                idx = self.current_idx
            ))

    def sell(self,ticker,size=1):
        self.orders.append(
            Order(
                ticker = ticker,
                side = 'sell',
                size = -size,
                idx = self.current_idx
            ))
        
    def buy_limit(self,ticker,limit_price, size=1):
        self.orders.append(
            Order(
                ticker = ticker,
                side = 'buy',
                size = size,
                limit_price=limit_price,
                order_type='limit',
                idx = self.current_idx
            ))

    def sell_limit(self,ticker,limit_price, size=1):
        self.orders.append(
            Order(
                ticker = ticker,
                side = 'sell',
                size = -size,
                limit_price=limit_price,
                order_type='limit',
                idx = self.current_idx
            ))
        
    @property
    def position_size(self):
        return sum([t.size for t in self.trades])

    @property
    def close(self):
        return self.data.loc[self.current_idx]['Close']
        
    def on_bar(self):
        """This method will be overriden by our strategies.
        """
        pass

class Engine():
    def __init__(self, initial_cash=100_000):
        self.strategy = None
        self.cash = initial_cash
        self.initial_cash = initial_cash
        self.data = None
        self.current_idx = None
        self.cash_series = {}
        self.stock_series = {}
        self.datetime = {}

        
    def add_data(self, data:pd.DataFrame):
        # Add OHLC data to the engine
        data['Index'] = np.arange(data.shape[0])
        data = data.reset_index().set_index('Index')
        self.data = data
        
    def add_strategy(self, strategy):
        # Add a strategy to the engine
        self.strategy = strategy

    
    def run(self):
        # We need to preprocess a few things before running the backtest
        self.strategy.data = self.data
        self.strategy.cash = self.cash
        
        for idx in tqdm(self.data.index):
            # fill orders from previus period
            self._fill_orders()
            # Run the strategy on the current bar
            self.current_idx = idx
            self.strategy.current_idx = self.current_idx
            self.strategy.on_bar()
            self.cash_series[idx] = self.cash
            self.datetime[idx] = self.data.loc[self.current_idx]['Date']
            self.stock_series[idx] = self.strategy.position_size * self.data.loc[self.current_idx]['Close']
        return self._get_stats()
                
    def _fill_orders(self):
        for order in self.strategy.orders:
            # FOR NOW, SET FILL PRICE TO EQUAL OPEN PRICE. THIS HOLDS TRUE FOR MARKET ORDERS
            fill_price = self.data.loc[self.current_idx]['Open']
            can_fill = False
            if order.side == 'buy' and self.cash >= self.data.loc[self.current_idx]['Open'] * order.size:
                if order.type == 'limit':
                    # LIMIT BUY ORDERS ONLY GET FILLED IF THE LIMIT PRICE IS GREATER THAN OR EQUAL TO THE LOW PRICE
                    if order.limit_price >= self.data.loc[self.current_idx]['Low']:
                        fill_price = order.limit_price
                        can_fill = True
                        print(self.current_idx, 'Buy Filled. ', "limit",order.limit_price," / low", self.data.loc[self.current_idx]['Low'])

                    else:
                        print(self.current_idx,'Buy NOT filled. ', "limit",order.limit_price," / low", self.data.loc[self.current_idx]['Low'])
                else:        
                    can_fill = True 
            elif order.side == 'sell' and self.strategy.position_size >= order.size:
                if order.type == 'limit':
                    #LIMIT SELL ORDERS ONLY GET FILLED IF THE LIMIT PRICE IS LESS THAN OR EQUAL TO THE HIGH PRICE
                    if order.limit_price <= self.data.loc[self.current_idx]['High']:
                        fill_price = order.limit_price
                        can_fill = True
                        print(self.current_idx,'Sell filled. ', "limit",order.limit_price," / high", self.data.loc[self.current_idx]['High'])

                    else:
                        print(self.current_idx,'Sell NOT filled. ', "limit",order.limit_price," / high", self.data.loc[self.current_idx]['High'])
                else:
                    can_fill = True
                    
            if can_fill:
                t = Trade(
                    ticker = order.ticker,
                    side = order.side,
                    price= fill_price,
                    size = order.size,
                    type = order.type,
                    idx = self.current_idx)

                self.strategy.trades.append(t)
                self.cash -= t.price * t.size
                self.strategy.cash = self.cash
        # BY CLEARING THE LIST OF PENDING ORDERS, WE ARE ASSUMING THAT LIMIT ORDERS ARE ONLY VALID FOR THE DAY
        # THIS TENDS TO BE THE DEFAULT. IMPLEMENTING GOOD TILL GRANTED WOULD REQUIRE US TO KEEP ALL UNFILLED LIMIT ORDERS.
        self.strategy.orders = []
            

    def _get_stats(self):
        metrics = {}
        total_return = 100 *((self.data.loc[self.current_idx]['Close'] * self.strategy.position_size + self.cash) / self.initial_cash -1)
        metrics['total_return'] = total_return
        # Create a the Buy&Hold Benchmark
        # portfolio_bh = ((self.initial_cash / self.data.loc[self.data.index[0]]['Open']) * self.data.Close, self.data.loc[self.data.index[0]]['Date'])
        portfolio_bh = pd.DataFrame({'data':(self.initial_cash / self.data.loc[self.data.index[0]]['Open']) * self.data.Close, 'date':self.datetime})
        portfolio_bh = portfolio_bh.set_index('date')
        # Create a dataframe with the cash and stock holdings at the end of each bar
        portfolio = pd.DataFrame({'stock':self.stock_series, 'cash':self.cash_series, 'date':self.datetime})
        portfolio = portfolio.reset_index().set_index("date")
        # Add a third column with the total assets under managemet
        portfolio['total_aum'] = portfolio['stock'] + portfolio['cash']
        # Caclulate the total exposure to the asset as a percentage of our total holdings
        metrics['exposure_pct'] = ((portfolio['stock'] / portfolio['total_aum']) * 100).mean()
        # Calculate annualized returns
        p = portfolio.total_aum
        metrics['returns_annualized'] = ((p.iloc[-1] / p.iloc[0]) ** (1 / ((p.index[-1] - p.index[0]).days / 365)) - 1) * 100
        p_bh = portfolio_bh
        metrics['returns_bh_annualized'] = ((p_bh.iloc[-1] / p_bh.iloc[0]) ** (1 / ((p_bh.index[-1] - p_bh.index[0]).days / 365)) - 1) * 100
        
        # Calculate the annualized volatility. I'm assuming that we're using daily data of an asset that trades only during working days (ie: stocks)
        # If you're  trading cryptos, use 365 instead of 252
        self.trading_days = 252
        metrics['volatility_ann'] = p.pct_change().std() * np.sqrt(self.trading_days) * 100
        metrics['volatility_bh_ann'] = p_bh.pct_change().std() * np.sqrt(self.trading_days) * 100
        
        # Now that we have the annualized returns and volatility, we can calculate the Sharpe Ratio
        # Keep in mind that the sharpe ratio also requires the risk free rate. For simplicity, I'm assuming a risk free rate of 0.as_integer_ratio
        # You should define the risk_free_rate in the __init__() method instead of here.
        self.risk_free_rate = 0
        metrics['sharpe_ratio'] = (metrics['returns_annualized'] - self.risk_free_rate) / metrics['volatility_ann']
        metrics['sharpe_ratio_bh'] = (metrics['returns_bh_annualized'] - self.risk_free_rate) / metrics['volatility_bh_ann']
    
        # For later plotting purposes, we'll store the portfolio series
        self.portfolio = portfolio
        self.portfolio_bh = portfolio_bh
        
        metrics['Number of Traders'] = len(self.strategy.trades)

        # Max drawdown
        # metrics['max_drawdown'] = get_max_drawdown(portfolio.total_aum)
        # metrics['max_drawdown_bh'] = get_max_drawdown(portfolio_bh)
    
        return metrics
    
    def plot(self):
        plt.plot(self.portfolio['total_aum'],label='Strategy')
        plt.plot(self.portfolio_bh,label='Buy & Hold')
        plt.show()

    def get_max_drawdown(close):
        roll_max = close.cummax()
        daily_drawdown = close / roll_max - 1.0
        max_daily_drawdown = daily_drawdown.cummin()
        return max_daily_drawdown.min() * 100



