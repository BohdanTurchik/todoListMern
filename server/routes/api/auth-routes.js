import { authController } from "../../controllers/authController.js";
import { Router } from "express";
import { auth } from "../../middleWare/authMiddleWare.js";
import { todoController } from "../../controllers/todoControler.js";



const router = Router();

router.get("/get", auth , authController.getAllUsers.bind(authController));
router.post("/create", authController.createUser.bind(authController));
router.post("/login", authController.login.bind(authController));
router.post("/logout", authController.logout.bind(authController))
router.post('/todos',  todoController.getAllTodo.bind(todoController));
router.post("/made", todoController.createTodo.bind(todoController));
router.delete("/del", todoController.deleteTodo.bind(todoController));
router.put("/update", todoController.updateTodo.bind(todoController))



export default router;
