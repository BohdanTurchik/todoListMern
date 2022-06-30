import express from "express";
import cors from 'cors';
import bodyParser from "body-parser"


import connectDB from "./config/dataBase.js";
import AppRouter from "./routes/index.js";

const app = express();
const router = new AppRouter(app);

// Connect to MongoDB
connectDB();

// Express configuration
app.set("port", 5000);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json({ extended:true}))
router.init();


const start = async () => {
  try {
    const port = app.get('port')
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();

