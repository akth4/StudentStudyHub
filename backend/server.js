import express from "express"; //create backend server easily
import cors from "cors";//frontend talks to backend
import AIRoutes from "./routes/ai.js";//get ai routes

import dotenv from "dotenv";//use variables from .env file
dotenv.config();//loads variables from .env to process.env

const app = express();//creates backend server app
app.use(express.json()); //lets server read JSON data from requests
app.use(cors());//enable cors for all requests so theyre not blocked by browser
app.use("/api", AIRoutes)//connect /api url to server


const PORT = process.env.PORT || 3000; //if a port is not given in .env, use 3000
//start server, listens from requests
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);//prints in terminal
})
