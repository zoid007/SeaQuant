import { Button, TextInput } from "@carbon/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Dropdown,
  OverflowMenu,
  OverflowMenuItem,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Tab,
} from "@carbon/react";
import { IconButton } from "@carbon/react";
import { Add, Calculation, Row } from "@carbon/react/icons";

import "../App.scss";
import { useState } from "react";
import { Sidebar } from "../components";
import { Expression } from "../utills/ExpressionData";
import IndicatorData from "../utills/IndicatorsData";
import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";


function DragAndDrop(props) {
  var tab = props.Action;

  const items = [
    {
      id: "gt",
      label: "Greater Then ",
    },
    {
      id: "lt",
      label: "Less Then",
    },
    {
      id: "ca",
      label: "Crossed Above",
    },
    {
      id: "cb",
      label: "Crossed Below",
    },
    {
      id: "eq",
      label: "Equal To",
    },
    {
      id: "ne",
      label: "Not Equal To",
    },
    {
      id : "gte",
      label : "Greater Then Equal To"
    },
    {
      id : "lte",
      label : "Less Then Equal To"
    }
  ];

  const Indicators = [
    {
      id: "Open",
      label: "Open",
    },
    {
      id: "High",
      label: "High",
    },
    {
      id: "Low",
      label: "Low",
    },
    {
      id: "Close",
      label: "Close",
    },
  ];

  const timeframe = [
    {
      id: "1M",
      label: "1 Minute",
    },
    {
      id: "5M",
      label: "5 Minute",
    },
    {
      id: "15M",
      label: "15 Minute",
    },
    {
      id: "1H",
      label: "1 Hour",
    },
    {
      id: "1D",
      label: "1 Day",
    },
    {
      id: "1W",
      label: "1 Week",
    },
    {
      id: "1M",
      label: "1 Month",
    },
  ];

  var [nextId, setNextId] = useState(1);

  var exp = { ...Expression, Action: tab };
  const [filters, setfilters] = useState([exp]);

  const AddFilter = (type) => {
    const updatedFilter = {
      id: nextId,
      type: type,
      Operation: "Greater_Then",
      Action: tab,
      Operand: {
        OperandType: "StockAttribute",
        Constant: undefined,
        StockAttribute: {
          Timeframe: undefined,
          Attribute: undefined,
        },
        Indicators: {
          Timeframe: undefined,
          Variables: undefined,
          Attribute: undefined,
        },
        Math: {
          Func: undefined,
          ParmType: undefined,
          Constant: undefined,
          StockAttribute: {
            Timeframe: undefined,
            Attribute: undefined,
          },
          Indicators: {
            Timeframe: undefined,
            Variables: undefined,
            Attribute: undefined,
          },
        },
      },
      OperandB: {
        OperandType: "StockAttribute",
        Constant: undefined,
        StockAttribute: {
          Timeframe: undefined,
          Attribute: undefined,
        },
        Indicators: {
          Timeframe: undefined,
          Variables: undefined,
          Attribute: undefined,
        },
        Math: {
          Func: undefined,
          ParmType: undefined,
          Constant: undefined,
          StockAttribute: {
            Timeframe: undefined,
            Attribute: undefined,
          },
          Indicators: {
            Timeframe: undefined,
            Variables: undefined,
            Attribute: undefined,
          },
        },
      },
    };

    setfilters([...filters, updatedFilter]);
    setNextId(nextId + 1);
  };

  console.log(filters);

  const AddSubFilter = (value) => {

    const filter = [...filters];
    const Exp = {
      ...Expression,
      id: value,
      type: "sub-filter",
      Action: tab,
    };

    filter.splice(value, 0, Exp);
    setfilters(filter);
    setNextId(nextId + 1);

    console.log(filters);
  };

  const setFilterType = (index, label) => {
    setfilters(
      filters.map((filter, indx) => {
        if (indx === index) {
          return {
            ...filter,
            Operand: {
              ...filter.Operand,
              OperandType: label,
            },
          };
        } else {
          return filter;
        }
      })
    );


  };

  const setFilter2Type = (index, label) => {
    filters[index].OperandB.OperandType = label;
    console.log(filters);
    setNextId(nextId + 1);
  };

  const [Indicator, setIndicator] = useState(false);

  const handleIndicator = (index, name, value, operand) => {
    var filter = filters.slice();
    if (operand == "A") {
      filters[index].Operand.Indicators.Attribute = name;
      filters[index].Operand.Indicators.Variables = value;
    } else if (operand == "B") {
      filters[index].OperandB.Indicators.Attribute = name;
      filters[index].OperandB.Indicators.Variables = value;
    }
    setfilters(filter);
  };

  props.handleCallback(filters);

  const [searchParams, setSearchParams] = useSearchParams();


  if (tab == "Long_Entry") {
    useEffect(() => {
      axios.get('http://localhost:8000/strategy/getstrategy?id='+searchParams.get("id"))
        .then(response => setfilters(JSON.parse(response.data['data']['draganddroplogic'])['LongEntry']))
        .catch(error => console.log(error));
    }, [tab]);
  }

  if (tab == "Short_Entry") {
    useEffect(() => {
      axios.get('http://localhost:8000/strategy/getstrategy?id='+searchParams.get("id"))
        .then(response => setfilters(JSON.parse(response.data['data']['draganddroplogic'])['ShortEntry']))
        .catch(error => console.log(error));
    }, [tab]);
  }

  if (tab == "Short_Exit") {
    useEffect(() => {
      axios.get('http://localhost:8000/strategy/getstrategy?id='+searchParams.get("id"))
        .then(response => setfilters(JSON.parse(response.data['data']['draganddroplogic'])['ShortExit']))
        .catch(error => console.log(error));
    }, [tab]);
  }
  if (tab == "Long_Exit") {
    useEffect(() => {
      axios.get('http://localhost:8000/strategy/getstrategy?id='+searchParams.get("id"))
        .then(response => setfilters(JSON.parse(response.data['data']['draganddroplogic'])['LongExit']))
        .catch(error => console.log(error));
    }, [tab]);
  }
  console.log("data",tab)
  
  return (
    <div className="Drag-and-Drop-Block">
      {filters.map((filter, index, elements) => {
        return (
          <>
            <div
              className={"Drag-and-Drop-" + filter.type}
              id={index}
              name={index}
            >
              <OverflowMenu
                iconClass="black-icon"
                renderIcon={Row}
                data-floating-menu-container
                selectorPrimaryFocus={".optionOne"}
              >
                <OverflowMenuItem
                  onClick={() => setFilterType(index, "Constant")}
                  className="optionOne"
                  itemText="Constant"
                />
                <OverflowMenuItem
                  onClick={() => setFilterType(index, "StockAttribute")}
                  className="optionTwo"
                  itemText="Stock Attribute"
                  requireTitle
                />
                <OverflowMenuItem
                  onClick={() => setFilterType(index, "indicator")}
                  itemText="Indicator"
                />
                <OverflowMenuItem
                  onClick={() => setFilterType(index, "mathFunction")}
                  itemText="Math Function"
                  hasDivider
                />
              </OverflowMenu>

              {/* <p style={{ width: '4rem', marginRight: '-1.6rem'}}>(12, 0)</p> */}

              {filter.Operand.OperandType == "StockAttribute" && (
                <>
                  <Dropdown
                    ariaLabel="Dropdown"
                    id="select-timeframe"
                    items={timeframe}
                    label="Select Timeframe"
                    size="sm"
                    disabled={false}
                    type="inline"
                    onChange={(e) => {
                      filter.Operand.StockAttribute.Timeframe =
                        e.selectedItem.id;
                    }}
                  />

                  <Dropdown
                    ariaLabel="Dropdown"
                    id="select-indicator"
                    items={Indicators}
                    label="Attribute"
                    size="sm"
                    disabled={false}
                    type="inline"
                    className="Drag-and-Drop-Node"
                    onChange={(e) => {
                      filter.Operand.StockAttribute.Indicators =
                        e.selectedItem.id;
                    }}
                  />
                  <IconButton kind="ghost">
                    <Calculation />
                  </IconButton>
                </>
              )}

              {filter.Operand.OperandType == "Constant" && (
                <>
                  <TextInput
                    labelText=""
                    className="constantInput"
                    id="test2"
                    invalidText="A valid value is required"
                    size="sm"
                    placeholder="Constant Value"
                    onChange={(e) => {
                      filter.Operand.Constant = e.target.value;
                    }}
                  ></TextInput>
                </>
              )}

              {filter.Operand.OperandType == "indicator" && (
                <>
                  <Dropdown
                    ariaLabel="Dropdown"
                    id="select-indicator-timeframe"
                    items={timeframe}
                    label="Select Timeframe"
                    size="sm"
                    disabled={false}
                    type="inline"
                    onChange={(e) => {
                      filter.Operand.Indicators.Timeframe = e.selectedItem.id;
                    }}
                  />
                  <TextInput
                    className="selectIndicatorVariable"
                    id="test2"
                    invalidText="A valid value is required"
                    defaultValue={filter.Operand.Indicators.Variables}
                    labelText=""
                    lable=""
                    size="sm"
                    style={{
                      width: "3rem",
                      border: "none",
                      outline: "none",
                      padding: "0 0",
                    }}
                    onChange={(e) => {
                      filter.Operand.Indicators.Variables = e.target.value;
                    }}
                  ></TextInput>

                  <Dropdown
                    ariaLabel="Dropdown"
                    id="select-indicator-attribute"
                    items={IndicatorData}
                    label="Attribute"
                    size="sm"
                    disabled={false}
                    type="inline"
                    className="Drag-and-Drop-Node"
                    // onChange={(e) => {{elements[index].Operand.Indicators.Attribute = e.selectedItem.label}
                    //     {elements[index].Operand.Indicators.Variables = e.selectedItem.variable; setIndicator(e.selectedItem.variable)
                    // }}}
                    onChange={(e) => {
                      handleIndicator(
                        index,
                        e.selectedItem.label,
                        e.selectedItem.variable,
                        "A"
                      );
                    }}
                  />
                  <IconButton kind="ghost">
                    <Calculation />
                  </IconButton>
                </>
              )}
              <Dropdown
                ariaLabel="Dropdown"
                id="carbon-dropdown-example"
                items={items}
                label="Operations"
                size="sm"
                disabled={false}
                type="inline"
                className="select-comparison"
              />
              <OverflowMenu
                iconClass="black-icon"
                renderIcon={Row}
                data-floating-menu-container
                selectorPrimaryFocus={".optionOne"}
              >
                <OverflowMenuItem
                  onClick={() => setFilter2Type(index, "Constant")}
                  className="optionOne"
                  itemText="Constant"
                />
                <OverflowMenuItem
                  onClick={() => setFilter2Type(index, "StockAttribute")}
                  className="optionTwo"
                  itemText="Stock Attribute"
                  requireTitle
                />
                <OverflowMenuItem
                  onClick={() => setFilter2Type(index, "indicator")}
                  itemText="Indicator"
                />
                <OverflowMenuItem
                  onClick={() => setFilter2Type(index, "mathFunction")}
                  itemText="Math Function"
                  hasDivider
                />
              </OverflowMenu>

              {filter.OperandB.OperandType == "StockAttribute" && (
                <>
                  <Dropdown
                    ariaLabel="Dropdown"
                    id="carbon-dropdown-example"
                    items={timeframe}
                    label="Timeframe"
                    size="sm"
                    disabled={false}
                    type="inline"
                    onChange={(e) => {
                      filter.Operand.StockAttribute.Timeframe =
                        e.selectedItem.id;
                    }}
                  />

                  <Dropdown
                    ariaLabel="Dropdown"
                    id="carbon-dropdown-example"
                    items={Indicators}
                    label="Attribute"
                    size="sm"
                    disabled={false}
                    type="inline"
                    className="Drag-and-Drop-Node"
                    onChange={(e) => {
                      filter.Operand.StockAttribute.Attribute =
                        e.selectedItem.id;
                    }}
                  />

                  <IconButton kind="ghost">
                    <Calculation />
                  </IconButton>
                </>
              )}

              {filter.OperandB.OperandType == "Constant" && (
                <>
                  <TextInput
                    id="test2"
                    invalidText="A valid value is required"
                    size="sm"
                    placeholder="Constant Value"
                    onChange={(e) => {
                      filter.OperandB.Constant = e.target.value;
                    }}
                  ></TextInput>
                </>
              )}
              {filter.OperandB.OperandType == "indicator" && (
                <>
                  <Dropdown
                    ariaLabel="Dropdown"
                    id="select-indicator-timeframe"
                    items={timeframe}
                    label="Select Timeframe"
                    size="sm"
                    disabled={false}
                    type="inline"
                    onChange={(e) => {
                      filter.OperandB.Indicators.Timeframe = e.selectedItem.id;
                    }}
                  />
                  <TextInput
                    className="selectIndicatorVariable"
                    id="test2"
                    invalidText="A valid value is required"
                    defaultValue={filter.OperandB.Indicators.Variables}
                    labelText=""
                    lable=""
                    size="sm"
                    style={{
                      width: "3rem",
                      border: "none",
                      outline: "none",
                      padding: "0 0",
                    }}
                    onChange={(e) => {
                      filter.OperandB.Indicators.Variables = e.target.value;
                    }}
                  ></TextInput>

                  <Dropdown
                    ariaLabel="Dropdown"
                    id="select-indicator-attribute"
                    items={IndicatorData}
                    label="Attribute"
                    size="sm"
                    disabled={false}
                    type="inline"
                    className="Drag-and-Drop-Node"
                    // onChange={(e) => {{elements[index].Operand.Indicators.Attribute = e.selectedItem.label}
                    //     {elements[index].Operand.Indicators.Variables = e.selectedItem.variable; setIndicator(e.selectedItem.variable)
                    // }}}
                    onChange={(e) => {
                      handleIndicator(
                        index,
                        e.selectedItem.label,
                        e.selectedItem.variable,
                        "B"
                      );
                    }}
                  />
                  <IconButton kind="ghost">
                    <Calculation />
                  </IconButton>
                </>
              )}
              <div style={{ marginLeft: "auto" }}>
                <OverflowMenu
                  iconClass="overflow-button-icon"
                  data-floating-menu-container
                  selectorPrimaryFocus={".optionOne"}
                >
                  <OverflowMenuItem className="optionOne" itemText="Delete" />
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

            {((filter.type == "sub-filter" &&
              filters[index + 1] == undefined) ||
              (filter.type == "sub-filter" &&
                filters[index + 1] != undefined &&
                filters[index + 1].type != "sub-filter")) && (
              <div
                id="add-sub-filter-button"
                name="add-sub-filter-button"
                value={index}
                style={{ marginTop: "8px", marginLeft: "4rem" }}
              >
                {/* <IconButton onClick={AddFilter}>
                                         <Add />
                                         </IconButton> */}
                <OverflowMenu
                  renderIcon={Add}
                  style={{
                    backgroundColor: "var(--cds-button-primary, #0f62fe)",
                    fill: "white",
                  }}
                  data-floating-menu-container
                  selectorPrimaryFocus={".optionOne"}
                  value={index}
                >
                  <OverflowMenuItem
                    value={index}
                    onClick={() => AddSubFilter(index + 1)}
                    className="optionOne"
                    itemText="Add Filter"
                  />
                  {/* <OverflowMenuItem onClick={() => AddFilter("sub-filter-lvl-2")}
                                                 className="optionTwo"
                                                 itemText="Add Sub-Filter"
                                                 requireTitle
                                             /> */}
                  <OverflowMenuItem itemText="Copy" />
                  <OverflowMenuItem itemText="Disable" hasDivider />
                </OverflowMenu>
              </div>
            )}
            {/* {filter.type == "sub-filter" ? "sub" : "non-sub"}  */}
          </>
        );
      })}

      <div style={{ marginTop: "8px" }}>
        {/* <IconButton onClick={AddFilter}>
                                              <Add />
                                              </IconButton> */}
        <OverflowMenu
          renderIcon={Add}
          style={{
            backgroundColor: "var(--cds-button-primary, #0f62fe)",
            fill: "white",
          }}
          data-floating-menu-container
          selectorPrimaryFocus={".optionOne"}
        >
          <OverflowMenuItem
            onClick={() => AddFilter("filter")}
            className="optionOne"
            itemText="Add Filter"
          />
          <OverflowMenuItem
            onClick={() => AddFilter("sub-filter")}
            className="optionTwo"
            itemText="Add Sub-Filter"
            requireTitle
          />
          <OverflowMenuItem itemText="Copy" />
          <OverflowMenuItem itemText="Disable" hasDivider />
        </OverflowMenu>
      </div>
    </div>
  );
}

function Backtest() {


  const [searchParams, setSearchParams] = useSearchParams();
  
  console.log(searchParams.get("id"))

  const [LongEntry, setLongEntry] = useState();
  const [ShortEntry, setShortEntry] = useState();
  const [LongExit, setLongExit] = useState();
  const [ShortExit, setShortExit] = useState();
  
  const Direction = []

  const CallbackLongEntry = (data) => {
    setLongEntry(data);
    Direction.push("Long")
  };

  const CallbackShortEntry = (data) => {
    setShortEntry(data);
    Direction.push("Short")

  };

  const CallbackLongExit = (data) => {
    setLongExit(data);
  };

  const CallbackShortExit = (data) => {
    setShortExit(data);
  };

  const [tab, setTab] = useState("Long_Entry");

  const handleTab = (tab) => {
    setTab(tab)
  };

  // if (Direction.includes("Long") && Direction.includes("Short")) {
  //   Direction[0] = "Long & Short"
  // }

  Direction[0] = "Long and Short"

  const handleSave = async (e) => {
    e.preventDefault();
    const API = axios.create({baseURL:'http://localhost:8000'})

        API.interceptors.request.use((req) => {
            if(localStorage.getItem("profile")){
                req.headers.Authorization = `Bearer ${
                    JSON.parse(localStorage.getItem("profile")).token
                }`;
            }
            return req;
        })
      const draganddroplogic = {
        LongEntry,ShortEntry,LongExit,ShortExit
      }
      const res = await API.post('/strategy/savedragdropstrategybyid?id='+searchParams.get("id")+'&direction='+Direction[0],draganddroplogic)
      console.log(res.data);
  }
  return (
    <>
      <Sidebar />

      <div className="App-box">
        <Breadcrumb>
          <BreadcrumbItem href="/">Dashboard</BreadcrumbItem>
          <BreadcrumbItem href="/">All Backtest</BreadcrumbItem>
        </Breadcrumb>

        <section>
          <div className="App-heading">
            <h2>Strategy Builder [Drag & Drop]</h2>
            <Button
              disabled={false}
              kind="primary"
              size="lg"
              // onClick={() => {
              //   // console.log(LongEntry, ShortEntry, LongExit, ShortExit);
              //   const strategy = {
              //     LongEntry,ShortEntry,LongExit,ShortExit
              //   }
              //   console.log(strategy)
                
              // }}
              onClick = {handleSave}
            >
              Save Strategy
            </Button>
          </div>
        </section>

        <div className="App-content">
          <div style={{ width: "75%" }}>
            <Tabs>
              <TabList aria-label="List of tabs" contained={false}>
                <Tab
                  onClick={() => {
                    handleTab("Long_Entry");
                  }}
                >
                  Long Entry
                </Tab>
                <Tab
                  onClick={() => {
                    handleTab("Short_Entry");
                  }}
                >
                  Short Entry
                </Tab>
                <Tab
                  onClick={() => {
                    handleTab("Long_Exit");
                  }}
                >
                  Long Exit
                </Tab>
                <Tab
                  onClick={() => {
                    handleTab("Short_Exit");
                  }}
                >
                  Short Exit
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <DragAndDrop
                    Action={"Long_Entry"}
                    handleCallback={CallbackLongEntry}
                  />
                </TabPanel>
                <TabPanel>
                  <DragAndDrop
                    Action={"Short_Entry"}
                    handleCallback={CallbackShortEntry}
                  />
                </TabPanel>
                <TabPanel>
                  <DragAndDrop Action={"Long_Exit"} handleCallback={CallbackLongExit} />
                </TabPanel>
                <TabPanel>
                  <DragAndDrop
                    Action={"Short_Exit"}
                    handleCallback={CallbackShortExit}
                  />
                </TabPanel>
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

export default Backtest;
