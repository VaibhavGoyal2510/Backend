import { v2 as cloudinary } from "cloudinary";

import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINAR_CLOUD_NAME,
  api_key: process.env.CLOUDINAR_API_KEY,
  api_secret: process.env.CLOUDINAR_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
        console.log("Here I am the error")
        return null;
    }
    // console.log("Before trying ");
    const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto",
    });
    // console.log("After trying ");

    console.log("File uploaded Successfully", response.url);
    fs.unlinkSync(localFilePath)
    return response;
  } catch (error) {
    // if (fs.existsSync(localFilePath)) {
    //   fs.unlinkSync(localFilePath);
    // } else {
    //   console.warn("⚠️ File not found for deletion:", localFilePath);
    // }
    fs.unlinkSync(localFilePath)
    return null;
  }
};

export { uploadOnCloudinary };
