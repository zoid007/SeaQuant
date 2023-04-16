import React, { useEffect, useState } from "react";
import { Form, Stack, TextInput, RadioTile, TileGroup, ComboBox, MultiSelect, Button, DatePicker, DatePickerInput } from '@carbon/react';
import { Sidebar } from '../components';
import axios from "axios";

function CreateBacktest() {

    const items = [
        {
          id: 'option-1',
          label: 'TATA MOTORS',
        },
        {
          id: 'option-2',
          label: 'BANKNIFTY',
        },
        {
          id: 'option-3',
          label: 'SONATASOFTW',
        },
        {
          id: 'option-4',
          label: 'MSFT',
        },
      ];



    const [AssetType, setAssetType] = useState("singleAsset")

    const options = [
        { id: "singleAsset", label: "Single Asset", value: "singleAsset" },
        { id: "multiAssets", label: "Multi Assets", value: "multiAssets" },
      ];
      
    const handleChange = (value) => {
        setAssetType(value)
    };
      

    const [StrategyList, setStrategyList] = useState([])
    const [StrategyObjectArray, setStrategyObjectArray] = useState([])

    useEffect(() => {

      const obj = {}

      axios.get('http://localhost:8000/strategy/getallstrategy')
        .then(response => 
        
        response.data.data.forEach(element => {
            obj["id"] = element._id
            obj["label"] = element.name
            console.log(element.name)
            setStrategyObjectArray([...StrategyObjectArray, obj])
        })

        )
        .catch(error => console.log(error));

    }, []);
  
    console.log(StrategyObjectArray)

    const [selectedStrategy, setSelectedStrategy] = useState(null);
    const [selectedStrategyId, setSelectedStrategyId] = useState(null);

    const handleCombobox = (event) => {  
            setSelectedStrategy(event.selectedItem.label);
            setSelectedStrategyId(event.selectedItem.id)
    };  

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
  
    const handleLoadingChange = (event) => {
      setIsLoading(event.isLoading);
    };

    console.log(startDate, endDate)

    const [name, setName] = useState("")
    const handleNameInput = (e) => {
        setName(e.target.value)
    }

    const [balance, setBalance] = useState("")
    const handleBalanceInput = (e) => {
        setBalance(e.target.value)
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(name, balance, startDate, endDate, selectedStrategyId)

        axios.get('http://localhost:8000/backtest/createbacktest?name='+name+'&initialcashbalance='+balance+'&strategyid=643c1a4b86336c639fbe5a54&fromdate=01/12/2012&todate=31/12/2022&symbolname=SONATASOFTW&initialcashbalance=100000')
        .then(response => console.log(response.data))
        .catch(error => console.log(error));
    }
    return (
        <div style={{ padding: "8rem 16rem" }}>


            <Sidebar />

            <Form>
                <Stack gap={7}>
                    <TextInput
                        helperText="Provide a name for your backtest it will help you to identify it later"
                        id="test2"
                        invalidText="Invalid error message."
                        labelText="Backtest Name"
                        placeholder="Eg. Last Decade Macd-Convergence Divergence-Strategy Performance"
                        onChange={(e) => {handleNameInput(e)}}
                    />
                    <p style={{ fontSize: '13px', color: "#525252", marginBottom: '-2rem' }}>Select Datetime Range</p>

                    <div style={{display: 'inline-flex'}}>

                    <div style={{display: 'inline-flex'}}>

                    
                    <DatePicker dateFormat="m/d/Y" datePickerType="simple">
                    <DatePickerInput
                        id="date-picker-default-id"
                        placeholder="mm/dd/yyyy"
                        labelText="Start Date"
                        type="text"
                        onChange={handleDateChange}
                    />
                    </DatePicker>
                
                    <DatePicker dateFormat="m/d/Y" datePickerType="simple">
                    <DatePickerInput
                        id="date-picker-default-id"
                        placeholder="mm/dd/yyyy"
                        labelText="End Date"
                        type="text"
                    />
                    </DatePicker>
  
                    </div>

                    <div style={{paddingLeft: '2rem',width: '300px', height: '100px', marginTop: '-2px'}}>
                        <ComboBox
                        id="carbon-combobox-example"
                        items={StrategyObjectArray}
                        label="Select Your Strategy"
                        titleText="Select Your Strategy"
                        size='md'
                        onChange={handleCombobox}
                        selectedItem={selectedStrategy}
                        />
  
                    </div>

                    <div style={{paddingLeft: '2rem', width: '300px', height: '100px'}}>

                    <TextInput
                        helperText=""
                        id="test2"
                        invalidText="Invalid error message."
                        labelText="Initial Opening Balance Amount"
                        placeholder="Initial Balance"
                        onChange={(e) => {handleBalanceInput(e)}}
                    />
                    </div>
                    </div>


                    <TileGroup
                        defaultSelected="singleAsset"
                        legend="Select an option"
                        name="radio-tile-group"
                        onChange={handleChange}
                    >
                        {options.map((option) => (
                        <RadioTile
                            key={option.id}
                            id={option.id}
                            name="radio-tile"
                            value={option.value}
                        >
                            {option.label}
                        </RadioTile>
                        ))}
                    </TileGroup>


                    {(AssetType == "singleAsset") ?
                    <div style={{width: '300px', height: '100px'}}>
                        <ComboBox
                        id="carbon-combobox-example"
                        items={items}
                        label="Select Asset"
                        titleText="Select your asset to perform backtest"
                        />
                    </div>

                    :
                    <div style={{width: '300px', height: '100px'}}>
                    <MultiSelect
                        id="carbon-multiselect-example"
                        items={items}
                        label="Select Assets List"
                        titleText="Select list of assets you want to perform backtest on"
                    />
                    </div>

                    }

                    <Button
                        kind="primary"
                        tabIndex={0}
                        type="submit"
                        onClick={(e) => handleSubmit(e)}
                    >
                        Submit
                    </Button>
                </Stack>
            </Form>


        </div>
    )
}

export default CreateBacktest;