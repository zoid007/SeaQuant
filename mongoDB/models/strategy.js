import mongoose from "mongoose";

const strategySchema = mongoose.Schema({
    name:{type:String,required:false},
    type:{type:String,required:false},
    date:{type:String, required: false},
    direction:{type:String, required: false},
    creator:{type:String,required:false},
    draganddroplogic:{type:String,required:false}
})

const StrategyModel = mongoose.model('Strategy',strategySchema)

export default StrategyModel;