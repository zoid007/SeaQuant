import { Button } from '@carbon/react';
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
import { rows,headersBacktest } from '../utills/Table-data';
import {Sidebar} from "../components"
import '../App.scss'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Backtest() {

  const [backtests, setBacktests] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/backtest/getAllBacktest')
      .then(response => setBacktests(response.data.data))
      .catch(error => console.log(error));
  }, []);

  console.log(backtests)

  const navigate = useNavigate();

  const handleNewBacktest = (e) => {
    navigate('/createBacktest')
  }

  const onBacktestClick = (row) => {
      navigate("/backtestReport?id=420a6aa3a4c6884ad15e3791b51970d4")
    

  }

  return (
    <>
    <Sidebar/>
    <div className="App-box">
        
      <Breadcrumb>
        <BreadcrumbItem href="/">Dashboard</BreadcrumbItem>
        <BreadcrumbItem href="/">All Backtest</BreadcrumbItem>
      </Breadcrumb>


    <section>
        <div className="App-heading">
          <h2>Backtest</h2>
          <Button onClick={(e) => {handleNewBacktest(e)}} disabled={false} kind='primary' size='lg'>New Backtest</Button>
        </div>
      </section>

    
      <div className='App-Content' style={{ marginTop: '2rem' }}>
          <Table size="sm">
            <TableHead>
              <TableRow>
                {headersBacktest.map((header) => (
                  <TableHeader id={header.key} key={header}>
                    {header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {backtests.map((row) => (
                <TableRow key={row._id} onClick={(row) => {onBacktestClick(row._id)}}>
                  {Object.keys(row)
                    .filter((key) => key !== '_id' && key !== 'strategyId' && key !== "__v")
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
