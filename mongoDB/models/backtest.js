import mongoose from "mongoose";

const backtestSchema = new mongoose.Schema({
  backtestname: { type: String, required: true },
  strategyId:{type:String,required:false},
  fromDate: { type: String, required: true },
  toDate: { type: String, required: true },
  symbolName: { type: String, required: true },
  initialCashBalance: { type: Number, required: true }
});

const BacktestModel = mongoose.model("Backtest", backtestSchema);

export default BacktestModel;
