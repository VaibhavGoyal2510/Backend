// require('dotenv'),config({path: '../.env'})


import dotenv from 'dotenv'
import dbConnect from "./db/index.js"

dotenv.config({
    path: "../.env"
})

dbConnect()




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