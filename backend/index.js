import express from "express"
import mongoose from "mongoose"
import 'dotenv/config'
import { userRoutes } from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";


const app = express();
const port = 8080
const mongoUrl= process.env.MONGO_URL

app.use(express.json());
app.use(cookieParser());
app.use("/user",userRoutes)


app.listen(port,()=>{
    console.log("Listening")
});

mongoose.connect(mongoUrl)
.then(()=>{console.log("Connected")})
.catch(e=>console.log(e));