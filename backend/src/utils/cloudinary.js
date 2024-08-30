import {v2 as cloudinary} from "cloudinary" ;
import fs from "fs" ;

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



const uploadOnCloudinary = async (localFilePath) => {

    // console.log("In upload func", localFilePath) ;

    try {
        if (!localFilePath) return null ;
        // upload the file to cloudinary


        const uploadResponse = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        })   
        
        // file has been uploaded
        // console.log("file is uploaded") ;
        // console.log(uploadResponse) ;
        
        // now after checking that this works, using console logs we need to unlink the files from the server also
        
        
        fs.unlinkSync(localFilePath) ;
        
        return uploadResponse ;

    }    
    catch(error) {
        fs.unlinkSync(localFilePath) ; // remove the locally saved temporary file as upload operation got failed
        
        console.error(error) ;

        return null ;
    }    
}    

export { uploadOnCloudinary }; 