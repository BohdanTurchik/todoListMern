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
  taskId:{
  },
  id:{
   type: mongoose.SchemaTypes.ObjectId,
   unique:true
  },
  
},
  {versionKey: false}
)

export const Todo = mongoose.model("Todo", todo)
