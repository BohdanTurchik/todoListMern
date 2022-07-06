import { Todo } from "../models/Todo.js";
import { todoService } from "../services/TodoService.js";
import {validateAccessToken} from "../jwt/jwtVerifive.js" 
import mongoose from "mongoose";

  


class TodoController {
  constructor() { }
  
  async getAllTodo(req, res) {
    try {
      const payload = validateAccessToken(req.cookies.token);
      
      const data =  await Todo.where({user:new mongoose.Types.ObjectId(payload)});
     
     
      res.status(200).json(data)
     
    } catch (e) {
      res.json(e.message)
    }
  }
  async createTodo(req, res) {
    try {
      const { task, id } = req.body
      console.log(id)
      const item  = await Todo.findOne({"_id": id})
      console.log(item)
      if(item){
        item.tasks.push({title: task,  isDone:false,})
        await Todo.updateMany({_id: id}, item)
      } else{
        const madeTodo = new Todo({tasks:[{title: task,  isDone:false,}], _id:id});
        await todoService.createTask(madeTodo)
        
      }
      const updateItem = await Todo.findOne({"_id": id})
      res.status(201).json(updateItem)
    } catch (e) {
      res.json(e.message)
    }

  }
  async deleteTodo(req, res) {
    try {
      const { i } = req.body
      await todoService.deleteTask({i})
      res.status(200).json({message: "deleted complide"})
    } catch (e) {
      res.json(e.message)
    }
  }
}
export const todoController = new TodoController();