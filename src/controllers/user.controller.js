import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req,res)=>{

    const {password,email,username,fullName} =req.body;
    console.log("email", email);

    if(
        [fullName,email,password,username].some((field)=>field?.trim()==="" )
    ){
        throw new ApiError(400,"All Fields are required.")
    }
    //Easy way of checking all fields one by one 
    // if (fullName===""){
    //     throw new ApiError(400,"FullName is required")
    // }

    // const existingUser = User.findOne({email})
    const existingUser = User.findOne({
        $or: [{username},{email}] 
    })

    if(existingUser){
        throw new ApiError(409,"User exists with the specified username or email")

    }

    const localAvatarPath = req.files?.avatar[0]?.path;
    const localCoverImagePath = req.files?.coverImage[0]?.path;
    
    if(!localAvatarPath){
        throw new ApiError(400,"Avatar is required ") //400 is bad request
    }

    const avatar = await uploadOnCloudinary(localAvatarPath); // That is why we added async at starting 
    // so that some tasks that require time can also be handled... like uploading takes time

    const coverImage = await uploadOnCloudinary(localCoverImagePath);

    if (!avatar){
        throw new ApiError(400,"Avatar is required ");
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url ,
        coverImage: coverImage?.url || "", // because it is not necessary 
        email,
        password,
        username: username.toLowerCase() 

    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    return res.status(201).json(ApiResponse(200,createdUser,"User Registered Successfully"))


    
})

export {registerUser};