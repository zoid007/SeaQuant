import React from 'react'
import { BrowserRouter, Link, Routes,Route } from 'react-router-dom'
import {Navbar} from './components'
import { Backtest,DragDrop,Strategy,Login,Signup} from './pages'
import PrivateRoute from "./pages/PrivateRoute"
import CreateBacktest from './pages/CreateBacktest'
import BacktestReport from './pages/backtestReport'

const App = () => {
  return (
    <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path="/backtest" element={<PrivateRoute><Backtest/></PrivateRoute>}/>
            <Route path="/dragdrop" element={<PrivateRoute><DragDrop/></PrivateRoute>}/>
            <Route path="/strategy" element={<PrivateRoute><Strategy/></PrivateRoute>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/createBacktest" element={<CreateBacktest/>}/>
            <Route path="/BacktestReport" element={<BacktestReport/>}/>
        </Routes>
    </BrowserRouter>
    
    
  )
}

export default App