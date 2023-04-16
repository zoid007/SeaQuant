from Backtest import Strategy, Engine
import pandas_ta as ta
import lib
import json
import yfinance as yf
import pandas as pd
import sys

strategy_dandd = []

def read_json_file(file_path):
    with open(file_path, 'r') as f:
        return json.load(f)

def write_json_file(file_path, data):
    with open(file_path, 'w') as f:
        json.dump(data, f)
    
input_file_path = sys.argv[1]
output_file_path = sys.argv[2]

input_data = read_json_file(input_file_path)



jsondata = input_data

data = yf.Ticker('AAPL').history(start='2012-12-01', end='2022-12-31', interval='1d')
e = Engine(initial_cash=1000)
# data = pd.read_csv('TATAMOTORS.csv')

def compareOperations(a, b, operation, data, idx):
    if operation == 'gt':
        return data[idx][a] > data[idx][b]
    elif operation == 'lt':
        return data[idx][a] < data[idx][b]
    elif operation == 'gte':
        return data[idx][a] >= data[idx][b]
    elif operation == 'lte':
        return data[idx][a] <= data[idx][b]
    elif operation == 'eq':
        return data[idx][a] == data[idx][b]
    elif operation == 'ne':
        return data[idx][a] != data[idx][b]
    elif operation == 'ca':
        return lib.crossover(data, a, b, idx)
    elif operation == 'cb':
        return lib.crossbelow(data, a, b, idx)
    else:
        return False



class SMACrossover(Strategy):
    def on_bar(self):
        if self.current_idx != 0:
                for index, i in enumerate(strategy_dandd):
                    if (i.__contains__('SubFilter')):
                        if compareOperations(i['A'], i['B'], i['Operation'], self.data, self.current_idx) and compareOperations(i['subFilter']['A'], i['B'], i['subFilter']['Operation'], self.data, self.current_idx):
                            if self.position_size == 0:
                                if i['Action'] == 'Long_Entry':
                                    order_size = self.cash / self.close
                                    self.buy_limit('AAPL', size=order_size, limit_price=self.close)
                            elif i['Action'] == 'Long_Exit':
                                if compareOperations(i['A'], i['B'], i['Operation'], self.data, self.current_idx) and compareOperations(i['subFilter']['A'], i['B'], i['subFilter']['Operation'], self.data, self.current_idx):
                                    limit_price = self.close
                                    self.sell_limit('AAPL', size=self.position_size, limit_price=self.close)
                    else:
                        if compareOperations(i['A'], i['B'], i['Operation'], self.data, self.current_idx):
                            if self.position_size == 0:
                                if i['Action'] == 'Long_Entry':
                                    order_size = self.cash / self.close
                                    self.buy_limit('AAPL', size=order_size, limit_price=self.close)
                            elif i['Action'] == 'Long_Exit':
                                if compareOperations(i['A'], i['B'], i['Operation'], self.data, self.current_idx):
                                    limit_price = self.close
                                    self.sell_limit('AAPL', size=self.position_size, limit_price=self.close)

def resample(df, freq, col_name, indicator, close, length):
    if not isinstance(df.index, pd.DatetimeIndex):
        df.index = pd.to_datetime(df.index)

    # Resample the DataFrame
    resampled_df = df.resample(freq).agg({
        'Open': 'first',
        'High': 'max',
        'Low': 'min',
        'Close': 'last',
        'Volume': 'sum'
    })


    resampled_df[col_name] = getattr(ta, indicator)(close=resampled_df['Close'], length=14)
    # Drop rows with all NaN values resulting from resampling
    # Reindex the resampled DataFrame back to the original frequency
    reindexed_df = resampled_df.reindex(df.index, method='ffill')
    
    df = df.join(reindexed_df[[col_name]])

    return df



data = yf.Ticker('AAPL').history(start='2012-12-01', end='2022-12-31', interval='1d')
e = Engine(initial_cash=1000)
# data = pd.read_csv('TATAMOTORS.csv')
print(data)
# data['sma_12'] = data.Close.rolling(12).mean()
# data['sma_24'] = data.Close.rolling(24).mean()
# data['RSI'] = calculate_rsi(data['Close'])

lastFilterIndex = 0

for indx, i in enumerate(jsondata):

    strategy = {}
    subStrategy = {}
    
    if (i['type'] == 'filter'):
        lastFilterIndex = indx
        strategy['Operation'] = i['Operation']
        strategy['Action'] = i['Action']
        if (i['Operand']['OperandType'] == 'indicator'):
            indicator = i['Operand']['Indicators']['Attribute']+"_INDX"+str(indx)+str(i['Operand']['Indicators']['Variables'][0])+i['Operand']['Indicators']['Timeframe']
            data[indicator] = getattr(ta, i['Operand']['Indicators']['Attribute'])(data['Close'], int(i['Operand']['Indicators']['Variables'][0]))
            strategy['A'] = indicator
        if (i['OperandB']['OperandType'] == 'indicator'):
            indicator = i['OperandB']['Indicators']['Attribute']+"_INDX"+str(indx)+str(i['OperandB']['Indicators']['Variables'][0])+i['OperandB']['Indicators']['Timeframe']
            # data = resample(data, i['OperandB']['Indicators']['Timeframe'], indicator, i['Operand']['Indicators']['Attribute'], 'Close', int(i['Operand']['Indicators']['Variables'][0]))
            data[indicator] = getattr(ta, i['OperandB']['Indicators']['Attribute'])(data['Close'], int(i['OperandB']['Indicators']['Variables'][0]))
            print(i['OperandB']['Indicators']['Attribute']+"_INDX"+str(indx)+str(i['OperandB']['Indicators']['Variables'][0])+i['OperandB']['Indicators']['Timeframe'])
            strategy['B'] = indicator

        if (i['Operand']['OperandType'] == 'StockAttribute'):
            indicator = (i['Operand']['StockAttribute']['Indicators'])
            print(indicator)
            strategy['A'] = indicator

        if (i['OperandB']['OperandType'] == 'StockAttribute'):
            indicator = (i['OperandB']['StockAttribute']['Indicators'])
            print(indicator)
            strategy['B'] = indicator


        if (i['Operand']['OperandType'] == 'Constant'):
            indicator = (str(i['Operand']['Constant'])+"_INDX"+str(indx))
            strategy['A'] = indicator
            data[indicator] = i['Operand']['Constant']

        if (i['OperandB']['OperandType'] == 'Constant'):
            indicator = (str(i['OperandB']['Constant'])+"_INDX"+str(indx))
            strategy['B'] = indicator
            data[indicator] = i['OperandB']['Constant']
        strategy_dandd.append(strategy)


    elif (i['type'] == 'sub-filter'):
        
        for jindx, j in enumerate(jsondata):
                    
            subStrategy['Operation'] = j['Operation']

            if (j['Operand']['OperandType'] == 'indicator'):
                indicator = j['Operand']['Indicators']['Attribute']+"_INDX"+str(jindx)+str(j['Operand']['Indicators']['Variables'][0])+j['Operand']['Indicators']['Timeframe']
                data[indicator] = getattr(ta, j['Operand']['Indicators']['Attribute'])(data['Close'], int(j['Operand']['Indicators']['Variables'][0]))
                subStrategy['A'] = indicator
            if (j['OperandB']['OperandType'] == 'indicator'):
                indicator = j['OperandB']['Indicators']['Attribute']+"_INDX"+str(jindx)+str(j['OperandB']['Indicators']['Variables'][0])+j['OperandB']['Indicators']['Timeframe']
                # data = resample(data, i['OperandB']['Indicators']['Timeframe'], indicator, i['Operand']['Indicators']['Attribute'], 'Close', int(i['Operand']['Indicators']['Variables'][0]))
                data[indicator] = getattr(ta, j['OperandB']['Indicators']['Attribute'])(data['Close'], int(i['OperandB']['Indicators']['Variables'][0]))
                print(j['OperandB']['Indicators']['Attribute']+"_INDX"+str(jindx)+str(j['OperandB']['Indicators']['Variables'][0])+j['OperandB']['Indicators']['Timeframe'])
                subStrategy['B'] = indicator

            if (j['Operand']['OperandType'] == 'StockAttribute'):
                indicator = (j['Operand']['StockAttribute']['Indicators'])
                print(indicator)
                subStrategy['A'] = indicator

            if (j['OperandB']['OperandType'] == 'StockAttribute'):
                indicator = (j['OperandB']['StockAttribute']['Indicators'])
                print(indicator)
                subStrategy['B'] = indicator


            if (i['Operand']['OperandType'] == 'Constant'):
                indicator = (str(j['Operand']['Constant'])+"_INDX"+str(jindx))
                subStrategy['A'] = indicator
                data[indicator] = j['Operand']['Constant']

            if (i['OperandB']['OperandType'] == 'Constant'):
                indicator = (str(j['OperandB']['Constant'])+"_INDX"+str(jindx))
                subStrategy['B'] = indicator
                data[indicator] = j['OperandB']['Constant'] 

            strategy_dandd[lastFilterIndex]['subFilter'] = subStrategy  

print(strategy_dandd)

e = Engine(initial_cash=1000)

e.add_data(data)
e.add_strategy(SMACrossover())
stats = e.run()

result = pd.DataFrame.from_dict(stats)


strategyperf = pd.DataFrame(e.portfolio[['total_aum']])
strategyperf.reset_index(inplace=True)

strategyperf.columns = ['date','value']
strategyperf['group'] = "Strategy_Performance"
strategyperf = strategyperf.to_json(orient = "records", date_format="iso")

hodl = pd.DataFrame(e.portfolio_bh['data'])
hodl.reset_index(inplace=True)
hodl.columns = ['date','value']
hodl['group'] = "Buy_and_Hold"

hodl = hodl.to_json(orient = "records", date_format="iso")


resultData = {}

resultData['HOLD'] = hodl
resultData['Strategy_Performance'] = strategyperf
resultData['Strategy_Stats'] = result.to_json()

# print(resultData)

# e.plot()


write_json_file(output_file_path, {"result": resultData})