import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req,res)=>{
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

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
    const existingUser = await User.findOne({
        $or: [{username},{email}] 
    })

    if(existingUser){
        throw new ApiError(409,"User exists with the specified username or email")

    }
    // console.log("files ",req.files); // this was coming as undefined
    const localAvatarPath = req.files?.avatar[0]?.path || null;
    // const localCoverImagePath = req.files?.coverImage[0]?.path || null;
    // console.log("File path ",localAvatarPath);
    if(!localAvatarPath){
        throw new ApiError(400,"Avatar is required ") //400 is bad request
    }

    let localCoverImagePath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
        localCoverImagePath = req.files?.coverImage[0]?.path 
    }


    // console.log(req.files);
    // console.log("This is body ->",req.body)
    
    const avatar = await uploadOnCloudinary(localAvatarPath); // That is why we added async at starting 
    // so that some tasks that require time can also be handled... like uploading takes time
    
    // console.log("This is avatar",avatar);
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

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json( new ApiResponse(200,createdUser,"User Registered Successfully"))


    
})

export {registerUser};