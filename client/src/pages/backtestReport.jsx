import React, { useState } from 'react'
import axios from 'axios'
import "../App.scss";
import "@carbon/charts/styles.css";

import { Sidebar } from '../components';
import { Button, TextInput } from "@carbon/react";
import {
    Breadcrumb,
    BreadcrumbItem,
    Tabs,
    TabList,
    TabPanel,
    TabPanels,
    Tab,
} from "@carbon/react";
import { AreaChart } from "@carbon/charts-react";

const BacktestReport = () => {


    const [option, setOption] = useState({

        "title": "Area (Buy and Hold VS Strategy)",
        "axes": {
            "bottom": {
                "title": "TIme",
                "mapsTo": "date",
                "scaleType": "time"
            },
            "left": {
                "mapsTo": "value",
                "scaleType": "linear",
                "title" : "Returns"
            }
        },
        "curve": "curveNatural",
        "height": "400px"

    })


    return (
        <>
            <Sidebar />

            <div className="App-box">
                <Breadcrumb>
                    <BreadcrumbItem href="/">Dashboard</BreadcrumbItem>
                    <BreadcrumbItem href="/">Backtest Report</BreadcrumbItem>
                </Breadcrumb>

                <section>
                    <div className="App-heading">
                        <h2>Backtest Result</h2>

                    </div>
                </section>

                <div className="App-content">
                    <div style={{ width: "75%" }}>
                        <Tabs>
                            <TabList aria-label="List of tabs" contained={false}>
                                <Tab
                                >
                                    Statistics
                                </Tab>
                                <Tab
                                >
                                    Strategy Stats
                                </Tab>
                                <Tab
                                >
                                    Trade Book
                                </Tab>
                                <Tab
                                >
                                    Miscellaneous
                                </Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <AreaChart
                                        data={data}
                                        options={option}>
                                    </AreaChart>
                                </TabPanel>
                                <TabPanel>

                                </TabPanel>
                                <TabPanel>
                                </TabPanel>
                                <TabPanel>

                                </TabPanel>
                                <TabPanel>Tab Panel 5</TabPanel>
                            </TabPanels>
                        </Tabs>
                    </div>
                </div>

            </div>
        </>

    )
}

export default BacktestReport