import { User } from "../models/User.js";
class AuthService {
  constructor() { }
  async findAll() {
    console.log("work")
    return await User.find()
  }
  async create(user) {
    console.log(user)
    return await User.create(user)
  }
  async login(user) {
    console.log(User)
    return await User(user)
  }

}
export const authService = new AuthService();