// require('dotenv'),config({path: '../.env'})


import dotenv from 'dotenv'
import dbConnect from "./db/index.js"
import { app } from './app.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config({
    path: "../.env"
})

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


dbConnect()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server Running `)
    })
})
.catch((err)=>{
    console.log("Mongo Connection Failed",err)
})




// import express from "express"
// const app = express()
// ;(async ()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
//         app.on("error",(e)=>{
//             console.log(`Error`,e)
//             throw e
//         })

//         app.listen(process.env.PORT,()=>{
//             console.log(`App is listening on port ${process.env.PORT}`)
//         })
//     } catch (error) {
//         console.log('ERROR: ',error);
//     }
// })