import { Todo } from "../models/Todo.js";
import { todoService } from "../services/TodoService.js";
import { validateAccessToken } from "../jwt/jwtVerifive.js"
import mongoose from "mongoose";




class TodoController {
  constructor() { }

  async getAllTodo(req, res) {
    try {
      const payload = validateAccessToken(req.cookies.token);

      const data = await Todo.where({ user: new mongoose.Types.ObjectId(payload) });


      res.status(200).json(data)

    } catch (e) {
      res.json(e.message)
    }
  }
  async createTodo(req, res) {
    try {
      const { task, id, taskId, isDone } = req.body
      const item = await Todo.findOne({ "_id": id })

      if (item) {
        item.tasks.push({ title: task, isDone: isDone, taskId: taskId })
        await Todo.updateMany({ _id: id }, item)
      } else {
        const madeTodo = new Todo({ tasks: [{ title: task, isDone: isDone, taskId: taskId }], _id: id });
        await todoService.createTask(madeTodo)

      }
      const updateItem = await Todo.findOne({ "_id": id })
      res.status(201).json(updateItem)
    } catch (e) {
      res.json(e.message)
    }

  }
  async deleteTodo(req, res) {
    try {
      const { id, idUser } = req.body

      const item = await Todo.findOne({ "_id": idUser })
      const arr = item.tasks
      const del = []

      await arr.filter((elem => elem.taskId !== id ? del.push(elem) : null))
      await todoService.deleteTask(item)
      const madeTodo = new Todo({ tasks: del, _id: idUser });
      await todoService.createTask(madeTodo)

      const updateItem = await Todo.findOne({ "_id": idUser })
      res.status(201).json(updateItem)

    } catch (e) {
      res.json(e.message)
    }
  }
  async updateTodo(req, res) {
    try {
      const { id, idUser, isDone } = req.body
      const item = await Todo.findOne({ "_id": idUser })
      const arr = item.tasks
      await todoService.deleteTask(item)
      let status = isDone
      if (isDone === false) {
        status = true
      } else if (isDone === true) {
        status = false
      }
      console.log(isDone)
      await arr.filter((elem => elem.taskId === id ? elem.isDone = status : null))

      const madeTodo = new Todo({ tasks: arr, _id: idUser });
      await todoService.createTask(madeTodo);

      const updateItem = await Todo.findOne({ "_id": idUser })
      res.status(200).json(updateItem)
    } catch (e) {
      res.json(e.message)
    }
  }
}
export const todoController = new TodoController();