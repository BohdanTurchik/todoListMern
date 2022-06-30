import mongoose from "mongoose";

const Schema = mongoose.Schema;

const todo = Schema({
  task:{
    type:String,
    required:true
  },
  isDone: false
})

export const Todo = mongoose.model("Todo", todo)
