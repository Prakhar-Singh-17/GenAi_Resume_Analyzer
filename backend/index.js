import express from "express"
import mongoose from "mongoose"
import 'dotenv/config'
import { userRoutes } from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { aiServiceRouter } from "./routes/aiServiceRoutes.js";


const app = express();
const port = 8080
const mongoUrl= process.env.MONGO_URL

app.use(express.json());
app.use(cookieParser());
app.use(cors({
     origin: ["http://localhost:5173",process.env.FRONTEND_URL],
    credentials: true
}));
app.use("/user",userRoutes)
app.use("/ai",aiServiceRouter);


app.listen(port,()=>{
    console.log("Listening")
});

mongoose.connect(mongoUrl)
.then(()=>{console.log("Connected")})
.catch(e=>console.log(e));