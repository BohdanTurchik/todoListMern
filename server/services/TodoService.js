import { Todo } from "../models/Todo.js";

class TodoService {
  constructor() { }
  async findAll() {
    console.log("work")
    return await Todo.find()
  }
  async createTask(task) {
    console.log(task)
    return await Todo.create(task)

  }
  async deleteTask(task) {
    console.log(task)
    return await Todo.delete(task)
  }
}

export const todoService = new TodoService(); 