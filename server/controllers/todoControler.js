import { Todo } from "../models/Todo.js";
import { todoService } from "../services/TodoService.js";

class TodoController {
  constructor() { }
  async getAllTodo(req, res) {
    try {
      const todo = Todo.find();
      res.status(200).json(todo)
    } catch (e) {
      res.json(e.message)
    }
  }
  async createTodo(req, res) {
    try {
      const { task } = req.body
      const madeTodo = new Todo(task);
      await todoService.createTask(madeTodo)
    } catch (e) {
      res.json(e.message)
    }

  }
  async deleteTodo(req, res) {
    try {
      const { task } = req.body
      await todoService.deleteTask(task)
    } catch (e) {
      res.json(e.message)
    }
  }
}
export const todoController = new TodoController();