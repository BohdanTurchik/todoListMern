import { Todo } from "../models/Todo.js";

class TodoService {
  constructor() { }
  async findAll() {
    console.log("work")
    return await Todo.find()
  }
  async createTask(task) {
    
    return await Todo.create(task)

  }
  async deleteTask(task) {
    console.log(task)
    return await Todo.deleteOne(task)
  }
}

export const todoService = new TodoService(); 