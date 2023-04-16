export const Expression = {
    id: 0,
    type: "filter",
    Operation: 'Greater_Then',
    Action: "Long_Entry",

    Operand : {

      OperandType: "StockAttribute",
      Constant : undefined,
      StockAttribute : {
          Timeframe : undefined,
          Attribute : undefined
      },
      Indicators : {
          Timeframe : undefined,
          Variables : undefined,
          Attribute : undefined
      },

      Math : {

          Func : undefined,
          ParmType : undefined,
          Constant : undefined,
          StockAttribute : {
              Timeframe : undefined,
              Attribute : undefined
          },
          Indicators : {
              Timeframe : undefined,
              Variables : undefined,
              Attribute : undefined
          },
      }
      
    },

    
  OperandB : {

      OperandType: "StockAttribute",
      Constant : undefined,
      StockAttribute : {
          Timeframe : undefined,
          Attribute : undefined
      },
      Indicators : {
          Timeframe : undefined,
          Variables : undefined,
          Attribute : undefined
      },

      Math : {

          Func : undefined,
          ParmType : undefined,
          Constant : undefined,
          StockAttribute : {
              Timeframe : undefined,
              Attribute : undefined
          },
          Indicators : {
              Timeframe : undefined,
              Variables : undefined,
              Attribute : undefined
          },
      }
  }


  }