import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDb from './mongoDB/connec.js';
import authRouter from './routes/auth.js'
import strategyRouter from "./routes/strategy.js"
import backtestRouter from "./routes/backtest.js"

dotenv.config();
const url = process.env.url
const app = express();
app.use(cors());
app.use(express.json({limit:'50mb'}))
app.use('/user',authRouter)
app.use('/strategy',strategyRouter)
app.use('/backtest',backtestRouter)

app.get('/',(req,res)=>{
    res.send('hello from server')
})

const startServer = async(req,res) =>{
    try {
        connectDb(url)
        app.listen(8000,()=> console.log("server started at 8000"))
    } catch (error) {
        console.log(error);
    }
}

startServer();