import { v2 as cloudinary } from "cloudinary";

import fs from "fs";

cloudinary.config({
    cloud_name: CLOUDINAR_CLOUD_NAME,
    api_key:process.env.CLOUDINAR_API_KEY,    
    api_secret: process.env.CLOUDINAR_API_SECRET
})

const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"      
        })

        console.log("File uploaded Successfully", response.url);
        return response;
        
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null;
    }
}

export {uploadOnCloudinary}