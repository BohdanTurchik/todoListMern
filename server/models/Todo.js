import mongoose from "mongoose";

const Schema = mongoose.Schema;

const todo = new Schema({
  tasks:{
    type:Array,
    required:true
  },
  isDone: {
    type:mongoose.SchemaTypes.Boolean,
    
  },
  id:{
   type: mongoose.SchemaTypes.ObjectId
  },
  
},
  {versionKey: false}
)

export const Todo = mongoose.model("Todo", todo)
