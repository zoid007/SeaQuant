import BacktestResultModel from "../mongoDB/models/backtestresult.js";

export const backTestResult = async (req,res) =>{
    const backtestname = req.query.name
    const backtestid = req.query.backtestid
    const strategyname = req.query.strategyname

    // const backtestname = req.body.name
    // const backtestid = req.body.backtestid
    // const strategyname = req.body.strategyname
    // const databuyandhold = req.body.databuyandhold
    // const datastrategyreturns = req.body.datastrategyreturns
    // const strategystatistics = req.body.strategystatistics

    try {
        const newBacktestResult = await BacktestResultModel.create({
            backtestname,
            backtestid,
            strategyname,
            databuyandhold,
            datastrategyreturns,
            strategystatistics
        })

        res.status(201).json({result:newBacktestResult})
    } catch (error) {
        res.status(404).json({message:"something went wrong"})
    }
}