import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import fs from "fs" ;
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const addNewApplicant = asyncHandler( async (req, res) => {

    const {name, email, state} = req.body ;
    const resumeLocalPath = req.file?.path ;
    // console.log(req) ;

    // check is any field is not present
    if ([name, email, state].some((field) => field?.trim() === "")) {
        res.status(400).json({
            message: "All fields are mandatory",
            status: 400,
        })

        unlinkFiles(resumeLocalPath) ;

        return ;
    }

    // check if the email already exists
    const existingUser = await User.findOne({email}) ;

    if (existingUser) {
        res.status(409).json({
            message: "User with this email already exists",
            status: 409,
            user: {name: existingUser.name, email: existingUser.email, state: existingUser.state, resume: existingUser.resume}
        })

        unlinkFiles(resumeLocalPath) ;

        return ;
    }

    // check if file path is recieved
    if (!resumeLocalPath) {
        res.status(403).json({
            message: "Resume is required",
            status: 403,
        })

        unlinkFiles(resumeLocalPath) ;

        return ;
    }

    // try to upload the resume to cloudinary
    const cloudinary_Resume_Upload_Response = await uploadOnCloudinary(resumeLocalPath) ;

    if (!cloudinary_Resume_Upload_Response) {
        res.status(500).json({
            message: "resume could not be uploaded, please try again",
            status: 500,
        })

        unlinkFiles(resumeLocalPath) ;

        return ;
    }

    // console.log("CLOUDINARY RESPONSE",cloudinary_Resume_Upload_Response)

    const createUser = await User.create({
        name, email, state, 
        resume: cloudinary_Resume_Upload_Response.url ,
    })

    if (!createUser) {
        res.status(500).json({
            message: "user could not be added, please try again",
            status: 500,
        })
        return ;
    }

    res.status(201).json({
        message: "Applicant registered successfully",
        status: 201,
        user : {
            name: createUser.name,
            email: createUser.email,
            state: createUser.state,
            resume: createUser.resume,
        }
    })

})


const unlinkFiles = (...filePaths) => {
    filePaths.forEach((filePath) => fs.existsSync(filePath) && fs.unlinkSync(filePath))
}


export {addNewApplicant} ;