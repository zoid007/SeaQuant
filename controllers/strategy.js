import StrategyModel from "../mongoDB/models/strategy.js";

export const createNewStrategy = async (req,res) => {
    const {name,type, direction} = req.body;
    console.log(req.body);

    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = today.toLocaleDateString('en-US', options);

    console.log(direction)
    try {
        const newStrategy = await StrategyModel.create({
            name,
            type,
            date,
            direction,
            creator:req.userId,
        })

        console.log(newStrategy)
        res.status(201).json({success:true,data:newStrategy})

    } catch (error) {
        res.status(404).json({message:"something went wrong"})
    }
}

export const saveDragDropLogicById = async (req, res) => {
    const id = req.query.id;
    const draganddroplogic = req.body;
    const dragAndDropString = JSON.stringify(draganddroplogic);
    const direction = req.query.direction
    try {
      const strategy = await StrategyModel.findById(id);
      
      if (!strategy) {
        return res.status(404).json({ message: "Strategy not found" });
      }
      
      strategy.draganddroplogic = dragAndDropString;
      strategy.direction = direction;
      const updatedStrategy = await strategy.save();
      
      res.status(200).json({ success: true, data: updatedStrategy });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };

export const getAllStrategy = async (req,res) =>{
    try {
        const strategy = await StrategyModel.find({});
        res.status(200).json({success:true, data: strategy})
    } catch (error) {
        res.status(500).json({success: false, message:error})
    }
}

export const getStrategy = async (req,res) =>{
  try {
      const strategy = await StrategyModel.findById(req.query.id);
      res.status(200).json({success:true, data: strategy})
  } catch (error) {
      res.status(500).json({success: false, message:error})
  }
}