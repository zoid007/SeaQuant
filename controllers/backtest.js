import BacktestModel from "../mongoDB/models/backtest.js"
import { spawn } from 'child_process';
import path from 'path';
import fs_module from 'fs';
import os from 'os';
import crypto from 'crypto';
import StrategyModel from "../mongoDB/models/strategy.js";
import merge from 'deepmerge';

const fs = fs_module.promises;


import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createTempFile(prefix, data) {
  const fileName = `${prefix}_${crypto.randomBytes(8).toString('hex')}.json`;
  const filePath = path.join(os.tmpdir(), fileName);
  await fs.writeFile(filePath, JSON.stringify(data)); // Changed to fsPromises
  return filePath;
}

async function readAndDeleteTempFile(filePath) {
  const data = JSON.parse(await fs.readFile(filePath, 'utf-8')); // Changed to fsPromises
  await fs.unlink(filePath); // Changed to fsPromises
  return data;
}


async function sendDataToPython(data, callback) {
    const pythonScriptPath = path.join(__dirname, 'startBacktest.py');
    const inputFile = await createTempFile('input', data);
    const outputFile = await createTempFile('output', {});
  
    const pythonProcess = spawn('python3', [pythonScriptPath, inputFile, outputFile]);
  
    pythonProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    
    // Listen for 'data' event on stderr and log the errors
    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
    
    pythonProcess.on('close', async () => {
      const outputData = await readAndDeleteTempFile(outputFile);
      callback(outputData);
      await fs.unlink(inputFile);
    });
  
    pythonProcess.on('error', (error) => {
      console.error(`Python error: ${error}`);
    });
  }

export const createBackTest = async (req,res) => {
    const backtestname = req.query.name
    const strategyId = req.query.strategyid
    const fromDate = req.query.fromdate
    const toDate = req.query.todate
    const symbolName = req.query.symbolname
    const initialCashBalance = 100000

    // const initialCashBalance = req.query.initialcashbalance

    // const backtestname = req.body.name
    // const strategyId = req.body.strategyid
    // const fromDate = req.body.fromdate
    // const toDate = req.body.todate
    // const symbolName = req.body.symbolname
    // const initialCashBalance = req.body.initialcashbalance
    console.log(backtestname);
    // try {
        const newBacktest = await BacktestModel.create({
            backtestname,
            strategyId,
            fromDate,
            toDate,
            symbolName,
            initialCashBalance
        })

        const strategy = await StrategyModel.findById(req.query.strategyid);
        const Longmerged = merge(JSON.parse(strategy['draganddroplogic'])["LongEntry"], JSON.parse(strategy['draganddroplogic'])["LongExit"])
        const Shortmerged = merge(JSON.parse(strategy['draganddroplogic'])["ShortEntry"], JSON.parse(strategy['draganddroplogic'])["ShortExit"])

        const merged = merge(Longmerged, Shortmerged)
        console.log(merged)

          

    sendDataToPython(merged, (result) => {
        console.log(JSON.parse(result.result['Strategy_Performance']));
        res.status(200).json(JSON.parse(result.result['Strategy_Performance']))

        });


        res.status(201).json({result:newBacktest})

}

export const getAllBacktest = async (req,res) =>{
    try {
        const backtest = await BacktestModel.find({});
        res.status(200).json({success:true, data: backtest})
    } catch (error) {
        res.status(500).json({success: false, message:error})
    }
}


