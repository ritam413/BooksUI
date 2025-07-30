import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY , 
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadResultonCloudinary = async(LocalFilePath)=>{
    try{
        if(!LocalFilePath) return null
        
        const response = await cloudinary.uploader.upload(LocalFilePath,{
            resource_type:"auto"
        })

        console.log(`File is Uploaded on Cloudinary: ${response.url}`);
        fs.unlinkSync(LocalFilePath)
        console.log(`File is delted from temp: ${LocalFilePath}`)
        
        return response 
    }catch(error){
        console.log(`Cloudinar Upload Error :${error} `);
        
        fs.unlinkSync(LocalFilePath)
        return null
    }
}

export {uploadResultonCloudinary}