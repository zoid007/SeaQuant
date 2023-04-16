import mongoose from "mongoose";

const backtestResultSchema = new mongoose.Schema({
  backtestname: { type: String, required: false },
  backtestid: { type: String, required: false },
  strategyid: { type: String, required: false },
  databuyandhold: [{ type: Object, required: false }],
  datastrategyreturns: [{ type: Object, required: false }],
  strategystatistics: [{ type: Object, required: false }]
});

const BacktestResult = mongoose.model("BacktestResult", backtestResultSchema);

export default BacktestResult;
