import mongoose from 'mongoose'

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
}, {
  versionKey: false
});

export const User = mongoose.model("User", user);
