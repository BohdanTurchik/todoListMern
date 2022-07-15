import mongoose from 'mongoose'
import { Todo } from './Todo';

const Schema = mongoose.Schema;


const user = Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  photoURL: String,
  nameUser:String
},
  Todo,
{
  versionKey: false
});

export const User = mongoose.model("User", user);
