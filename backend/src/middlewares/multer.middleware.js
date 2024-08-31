import multer from "multer";
import path from "path"

// multer configuration

const storage = multer.memoryStorage({
    destination: function(req, file, cb) { // here, file variable is the file incoming from the client side, req is the incoming request and cb is the callback method
        cb(null, "./public/temp")
    },
    
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() ;

        const newFileName = path.basename(file.originalname.replace(" ", "_"), path.extname(file.originalname)) + '_' + uniqueSuffix  + path.extname(file.originalname) ;

        // console.log("MULTER", newFileName) ;
        
        cb(null, newFileName) ;

        // uniqueSuffix thing is good to have because this will ensure the file name stays unique
    }
})

export const upload = multer({ 
    storage: storage 
}) ;