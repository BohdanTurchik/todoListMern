import { authService } from "../services/AuthService.js";
import { loginValidetion } from "../validation/user.js";
import { User } from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";


class AuthController {
  constructor() { }
  async getAllUsers(req, res) {
    try {
      const user = await User.find();
      res.status(200).json(user)

    } catch (e) {
      res.json(e.message)
    }
  }
  async createUser(req, res) {
    try {

      const { error } = loginValidetion(req.body);

      if (error) {
        return res.status(400).json({ massge: "bag contaent" })
      }
      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: "such a user already exists" })
      }

      const hashedPassword = await bcrypt.hash(password, 12);


      const user = new User({ email, password: hashedPassword })
      await authService.create(user)

      return res.status(200).json({ message: "registration was successful" });

    } catch (e) {
      res.status(500).json({ message: "try something wrong again" })
    }

  }
  async login(req, res) {
    try {
      const { error } = loginValidetion(req.body);
      if (error) {
        return res.status(400).json({ massge: "bad content" })
      }
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "user not found" })
      }

      const hashedPassword = await bcrypt.compare(password, user.password);

      if (!hashedPassword) {
        return res.status(400).json({ message: "wrong password" })
      }

      const token = jwt.sign(
        {
          _id: user._id
        },
        "seckret123",
        {
          expiresIn: "30d"
        }
      )
      return res.cookie("token", token).json({ token, user })

    } catch (e) {
      res.status(500).json({ message: "try something wrong again" })
    }


  }

}
export const authController = new AuthController(authService);
