import { Button, Header, HeaderName, SideNav, SideNavItems, SideNavMenu, SideNavMenuItem, SideNavLink } from '@carbon/react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Breadcrumb,
    BreadcrumbItem,
    TreeView,
    TreeNode,
    SelectItem,
    SelectItemGroup,
    Select,
    Dropdown,
    OverflowMenu,
    OverflowMenuItem,
    Tabs,
    TabList,
    TabPanel,
    TabPanels,
    Tab


} from '@carbon/react';
import { IconButton } from '@carbon/react';
import { Add, Filter } from '@carbon/react/icons';

import './App.scss'
import { useState } from 'react';

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

    const items = [
        {
            id: 'option-1',
            label: 'Greater Then ',
        },
        {
            id: 'option-2',
            label: 'Crossed Above',
        },
    ]

    const Indicators = [
        {
            id: 'option-1',
            label: 'RSI',
        },
        {
            id: 'option-2',
            label: 'MACD',
        },
    ]

    const timeframe = [
        {
            id: 'option-1',
            label: 'Current',
        },
        {
            id: 'option-2',
            label: '1 Day Ago',
        },
    ]


    var [nextId, setNextId] = useState(1)
    const [filters, setfilters] = useState([{
        id: 0,
        label: "Current",
        type: "filter",
    }])


    const AddFilter = () => {

        var filter = filters

        filter.push({
            id: nextId,
            label: "Current",
            type: "sub-filter",
        })

        console.log(filter)
        setfilters(filter);
        setNextId(nextId + 1)


    }

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
                        <h2>Strategy Builder [Drag & Drop]</h2>
                        <Button disabled={false} kind='primary' size='lg'>Save Strategy</Button>
                    </div>
                </section>

                <div className='App-content'>

                    <div style={{ width: '75%' }}>
                        <Tabs>
                            <TabList aria-label="List of tabs" contained={false}>
                                <Tab>Long Entry</Tab>
                                <Tab>Short Entry</Tab>
                                <Tab>Long Exit</Tab>
                                <Tab>Short Exit</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>

                                    <div className='Drag-and-Drop-Block'>

                                        {filters.map((filter) => {
                                            return (<>
                                            <div className={'Drag-and-Drop-' + filter.type}>

                                                <Dropdown
                                                    ariaLabel="Dropdown"
                                                    id="carbon-dropdown-example"
                                                    items={timeframe}
                                                    label="Select Timeframe"
                                                    size='sm' disabled={false}
                                                    type="inline" />
                                                <Dropdown
                                                    ariaLabel="Dropdown"
                                                    id="carbon-dropdown-example"
                                                    items={Indicators}
                                                    label="Attribute"
                                                    size='sm' disabled={false}
                                                    type="inline"
                                                    className="Drag-and-Drop-Node" />
                                                <Dropdown
                                                    ariaLabel="Dropdown"
                                                    id="carbon-dropdown-example"
                                                    items={items}
                                                    label="Operations"
                                                    size='sm' disabled={false}
                                                    type="inline"
                                                    className="Drag-and-Drop-Node" />
                                                <Dropdown
                                                    ariaLabel="Dropdown"
                                                    id="carbon-dropdown-example"
                                                    items={timeframe}
                                                    label="Timeframe"
                                                    size='sm' disabled={false}
                                                    type="inline" />
                                                <Dropdown
                                                    ariaLabel="Dropdown"
                                                    id="carbon-dropdown-example"
                                                    items={Indicators}
                                                    label="Attribute"
                                                    size='sm' disabled={false}
                                                    type="inline"
                                                    className="Drag-and-Drop-Node" />

                                                <OverflowMenu
                                                    data-floating-menu-container
                                                    selectorPrimaryFocus={'.optionOne'}
                                                >
                                                    <OverflowMenuItem
                                                        className="optionOne"
                                                        itemText="Delete"
                                                    />
                                                    <OverflowMenuItem
                                                        className="optionTwo"
                                                        itemText="Duplicate"
                                                        requireTitle
                                                    />
                                                    <OverflowMenuItem itemText="Copy" />
                                                    <OverflowMenuItem itemText="Disable" hasDivider />
                                                </OverflowMenu>

                                            </div>

                                            
                                        {/* {filter.type == "sub-filter" ? "sub" : "non-sub"}  */}

                                            </>
                                            )

                                        })}

                                        <div style={{ marginTop: '8px' }}>
                                            {/* <IconButton onClick={AddFilter}>
                                            <Add />
                                            </IconButton> */}
                                            <OverflowMenu renderIcon={Add} style={{ backgroundColor: 'var(--cds-button-primary, #0f62fe)', fill: 'white' }}
                                                data-floating-menu-container
                                                selectorPrimaryFocus={'.optionOne'}
                                            >
                                                <OverflowMenuItem onClick={AddFilter}
                                                    className="optionOne"
                                                    itemText="Delete"
                                                />
                                                <OverflowMenuItem
                                                    className="optionTwo"
                                                    itemText="Duplicate"
                                                    requireTitle
                                                />
                                                <OverflowMenuItem itemText="Copy" />
                                                <OverflowMenuItem itemText="Disable" hasDivider />
                                            </OverflowMenu>

                                        </div>

                                    </div>

                                </TabPanel>
                                <TabPanel>
                                    Tab Panel 2 <Button>Example button</Button>
                                </TabPanel>
                                <TabPanel>Tab Panel 3</TabPanel>
                                <TabPanel>Tab Panel 4</TabPanel>
                                <TabPanel>Tab Panel 5</TabPanel>
                            </TabPanels>
                        </Tabs>
                    </div>


                </div>
                {/* <div className='App-Content'>
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
    </div> */}
            </div>


        </>


    );
}

export default Backtest
