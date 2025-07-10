import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";



const dbConnect = async()=>{
    try {
        const connection = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
        console.log(`DB Connected meri jaaan, DB: ${connection.connection.host}`)
        
    } catch (error) {
        console.log(`MongoDb Connection Failed `,error)
        process.exit(1) 

    }
}


export default dbConnect;