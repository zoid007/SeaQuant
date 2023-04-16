import React from 'react'

export default function DragAndDrop() {
  return (
    <div className="Drag-and-Drop-Block">
                      {filters.map((filter, index, elements) => {
                        return (
                          <>
                            <div className={"Drag-and-Drop-" + filter.type} id={index} name={index}>
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
                                  onClick={() =>
                                    setFilterType(index, "StockAttribute")
                                  }
                                  className="optionTwo"
                                  itemText="Stock Attribute"
                                  requireTitle
                                />
                                <OverflowMenuItem
                                  onClick={() =>
                                    setFilterType(index, "indicator")
                                  }
                                  itemText="Indicator"
                                />
                                <OverflowMenuItem
                                  onClick={() =>
                                    setFilterType(index, "mathFunction")
                                  }
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
                                    onChange={(e) => {filter.Operand.StockAttribute.Timeframe = e.selectedItem.id}}
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
                                        filter.Operand.StockAttribute.Indicators = e.selectedItem.id
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
                                    onChange={(e) => {filter.Operand.Constant = e.target.value}}
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
                                    onChange={(e) => {filter.Operand.Indicators.Timeframe = e.selectedItem.id}}
  
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
                                    onChange={(e) => {filter.Operand.Indicators.Variables = e.target.value}}
  
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
                                    onChange={(e) => {handleIndicator(index, e.selectedItem.label, e.selectedItem.variable, "A")}}
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
                                  onClick={() =>
                                    setFilter2Type(index, "Constant")
                                  }
                                  className="optionOne"
                                  itemText="Constant"
                                />
                                <OverflowMenuItem
                                  onClick={() =>
                                    setFilter2Type(index, "StockAttribute")
                                  }
                                  className="optionTwo"
                                  itemText="Stock Attribute"
                                  requireTitle
                                />
                                <OverflowMenuItem
                                  onClick={() =>
                                    setFilter2Type(index, "indicator")
                                  }
                                  itemText="Indicator"
                                />
                                <OverflowMenuItem
                                  onClick={() =>
                                    setFilter2Type(index, "mathFunction")
                                  }
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
                                    onChange={(e) => {filter.Operand.StockAttribute.Timeframe = e.selectedItem.id}}

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
                                    onChange={(e) => {filter.Operand.StockAttribute.Attribute = e.selectedItem.id}}

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
                                    onChange={(e) => {filter.OperandB.Constant = e.target.value}}

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
                                    onChange={(e) => {filter.OperandB.Indicators.Timeframe = e.selectedItem.id}}
  
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
                                    onChange={(e) => {filter.OperandB.Indicators.Variables = e.target.value}}
  
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
                                    onChange={(e) => {handleIndicator(index, e.selectedItem.label, e.selectedItem.variable, "B")}}
                                  />
                                  <IconButton kind="ghost">
                                    <Calculation />
                                  </IconButton>
                                </>
                              )}
                              <div style={{marginLeft: "auto"}}>
                              <OverflowMenu
                              
                                iconClass="overflow-button-icon"
                                data-floating-menu-container
                                selectorPrimaryFocus={".optionOne"}
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
                                    backgroundColor:
                                      "var(--cds-button-primary, #0f62fe)",
                                    fill: "white",
                                  }}
                                  data-floating-menu-container
                                  selectorPrimaryFocus={".optionOne"}
                                  value={index}
                                >
                                  <OverflowMenuItem
                                    value={index}
                                    onClick={() => AddSubFilter(index+1)}
                                    className="optionOne"
                                    itemText="Add Filter"
                                  />
                                  {/* <OverflowMenuItem onClick={() => AddFilter("sub-filter-lvl-2")}
                                                 className="optionTwo"
                                                 itemText="Add Sub-Filter"
                                                 requireTitle
                                             /> */}
                                  <OverflowMenuItem itemText="Copy" />
                                  <OverflowMenuItem
                                    itemText="Disable"
                                    hasDivider
                                  />
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
  )
}
