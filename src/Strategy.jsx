import { Button, Header, HeaderName, SideNav, SideNavItems, SideNavMenu, SideNavMenuItem, SideNavLink } from '@carbon/react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Breadcrumb,
  BreadcrumbItem

} from '@carbon/react';
import './App.scss'

function Strategy() {


  const rows = [
    {
      id: '1',
      name: 'Viltautas Lillia',
      rule: '2023-04-17',
      Status: 'Net profit increase by 200% over TTM net profit',

    },
    {
      id: '2',
      name: 'Ocean Lebohang',
      rule: '2023-06-29',
      status: 'Top stocks quoting at a steep discount to its book value',

    },
    {
      id: 'load-balancer-3',
      name: 'Matrix Dynamic AI',
      rule: '2023-07-12',
      status: 'Bullish Engulf: Bullish Stocks by 2 days candles',

    },
    {
      id: 'load-balancer-4',
      name: 'Leverage clicks-and-mortar ROI',
      rule: '2023-07-13',
      status: 'Looking for Bullish stocks where there is volume and momentum and crossed PDH',

    },
    {
      id: 'load-balancer-5',
      name: 'BBand Blast Breakout',
      rule: '2023-09-27',
      status: 'RSI decreasing and Stochastic Crossed',

    },
    {
      id: 'load-balancer-6',
      name: 'Power Earning Gap UP',
      rule: '2023-07-13',
      status: '',

    },
    {
      id: 'load-balancer-7',
      name: 'Trend Reversal',
      rule: '2023-07-13',
      status: 'Bearish stocks - nearing their support level waiting for Down side breakout.',

    },
  ];
  const headers = ['Name', 'Date Created', 'Description'];


  return (
    <>

    <Header aria-label="SeaQuant">
        <HeaderName href="#" prefix="SeaQuant">
          [Strategy]
        </HeaderName>
    </Header>
      
      <SideNav
        isFixedNav
        expanded={true}
        isChildOfHeader={false}
        aria-label="Side navigation">
        <SideNavItems>
          <SideNavMenu title="Strategy" isActive={true}>
            <SideNavMenuItem href="https://www.carbondesignsystem.com/">
              L0 menu item
            </SideNavMenuItem>
            <SideNavMenuItem href="https://www.carbondesignsystem.com/">
              L0 menu item
            </SideNavMenuItem>
            <SideNavMenuItem href="https://www.carbondesignsystem.com/">
              L0 menu item
            </SideNavMenuItem>
          </SideNavMenu>
          <SideNavMenu title="Strategy">
            <SideNavMenuItem href="https://www.carbondesignsystem.com/">
              L0 menu item
            </SideNavMenuItem>
            <SideNavMenuItem
              href="https://www.carbondesignsystem.com/">
              L0 menu item
            </SideNavMenuItem>
            <SideNavMenuItem href="https://www.carbondesignsystem.com/">
              L0 menu item
            </SideNavMenuItem>
          </SideNavMenu>
          <SideNavMenu title="Exchange">
            <SideNavMenuItem href="https://www.carbondesignsystem.com/">
              L0 menu item
            </SideNavMenuItem>
            <SideNavMenuItem href="https://www.carbondesignsystem.com/">
              L0 menu item
            </SideNavMenuItem>
            <SideNavMenuItem href="https://www.carbondesignsystem.com/">
              L0 menu item
            </SideNavMenuItem>
          </SideNavMenu>
          <SideNavLink href="https://www.carbondesignsystem.com/">
            Dataset
          </SideNavLink>
          <SideNavLink href="https://www.carbondesignsystem.com/">
            L0 link
          </SideNavLink>
        </SideNavItems>
      </SideNav>



    <div className="App-box">
        
      <Breadcrumb>
        <BreadcrumbItem href="/">Dashboard</BreadcrumbItem>
        <BreadcrumbItem href="/">All Strategy</BreadcrumbItem>
      </Breadcrumb>


    <section>
        <div className="App-heading">
          <h2>Strategy</h2>
          <Button disabled={false} kind='primary' size='lg'>New Strategy</Button>
        </div>
      </section>

    
    <div className='App-Content'>
      <Table size="sm">
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <TableHeader id={header.key} key={header}>
              {header}
            </TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            {Object.keys(row)
              .filter((key) => key !== 'id')
              .map((key) => {
                return <TableCell key={key}>{row[key]}</TableCell>;
              })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  </div>


    </>

    
  );
}

export default Strategy
