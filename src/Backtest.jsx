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

function Backtest() {


  const rows = [
    {
      id: '1',
      name: 'Viltautas Lillia',
      rule: '2023-04-17',
      Status: 'Starting',
      other: 'NYSE',
      example: '1M',
    },
    {
      id: '2',
      name: 'Ocean Lebohang',
      rule: '2023-06-29',
      status: 'Active',
      other: 'S&P 500',
      example: '3Y',
    },
    {
      id: 'load-balancer-3',
      name: 'Matrix Dynamic AI',
      rule: '2023-07-12',
      status: 'Disabled',
      other: 'NIFTY200',
      example: '10Y',
    },
    {
      id: 'load-balancer-4',
      name: 'Leverage clicks-and-mortar ROI',
      rule: '2023-07-13',
      status: 'Disabled',
      other: 'NSE EQ',
      example: '5Y',
    },
    {
      id: 'load-balancer-5',
      name: 'BBand Blast Breakout',
      rule: '2023-09-27',
      status: 'Disabled',
      other: 'Test',
      example: '6M',
    },
    {
      id: 'load-balancer-6',
      name: 'Power Earning Gap UP',
      rule: '2023-07-13',
      status: 'Disabled',
      other: 'SGX',
      example: '10D',
    },
    {
      id: 'load-balancer-7',
      name: 'Trend Reversal',
      rule: '2023-07-13',
      status: 'Disabled',
      other: 'S&P 500',
      example: '3M',
    },
  ];
  const headers = ['Name', 'Date Created', 'Status', 'Dataset', 'Length'];


  return (
    <>

    <Header aria-label="SeaQuant">
        <HeaderName href="#" prefix="SeaQuant">
          [Backtest]
        </HeaderName>
    </Header>
      
      <SideNav
        isFixedNav
        expanded={true}
        isChildOfHeader={false}
        aria-label="Side navigation">
        <SideNavItems>
          <SideNavMenu title="Strategy">
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
          <SideNavMenu title="Backtest">
            <SideNavMenuItem href="https://www.carbondesignsystem.com/">
              L0 menu item
            </SideNavMenuItem>
            <SideNavMenuItem
              aria-current="page"
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
        <BreadcrumbItem href="/">All Backtest</BreadcrumbItem>
      </Breadcrumb>


    <section>
        <div className="App-heading">
          <h2>Backtest</h2>
          <Button disabled={false} kind='primary' size='lg'>New Backtest</Button>
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

export default Backtest
