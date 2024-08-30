import express from "express" 
import dotenv from "dotenv"
import { connectToDatabase } from "./src/db/index.js";
import cors from "cors" ;


// configure env
dotenv.config()



const PORT = process.env.PORT ;

const app = express() ;

// add middlewares

app.use(cors({
    origin: process.env.CORS_ORIGIN
}))

app.use(express.json({limit: "16kb"})) ;

app.use(express.urlencoded({extended: false, limit: "16kb"}))

app.use(express.static("public")) ;



// connect to database
connectToDatabase()
.then((dbConnectionInstance) => {
    console.log("Database is connected", dbConnectionInstance.connection.host) ;
})
.catch((err) => {
    console.log(err, " Could not connect to the database") ;
    process.exit(1) ;
})


// add routes
import userRouter from "./src/routes/user.route.js"

app.use("/api/v1/users", userRouter) ;

app.listen(PORT, () => {
    console.log(`App listening on Port ${PORT}`)
})