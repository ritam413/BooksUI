import { Books } from "../model/books.model.js";
import fs from 'fs'
import path from 'path'
import axios from 'axios'
import { uploadResultonCloudinary } from "../utils/cloudinary.js";

export const uploadBook = async (req, res) => {

    // Printing the Request Object
    console.log('BODY: ', req.body);
    console.log("FILE: ", req.file);

    //extracting title tags description from the req.body 
    const { title, tags, description, image } = req.body;

    // validating every fields
    if (!title || !description || (!req.file && !image)) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Getting the imageUrl
    let finalimageUrl;

    // wrapping in trycatch 
    try {

        if (req.file) {
            // Handling input via upload from localstorage 
            const fileResult = await uploadResultonCloudinary(req.file.path)

            finalimageUrl = fileResult.secure_url

        } else if (image) {
            // if image url is provided , download to localdisk then  upload to cloudinary

            //this line downloads image from a URL
            //responseType: 'arraybuffer' , because the image is binary data(not JSON or plain text)we need to get in a raw buffer format
            // returns a buffer containing the image bytes
            const axiosresponse = await axios.get(image, { responseType: 'arraybuffer' })


            // removes querry params from imageURL
            //ex:- https://example.com/image.png?token=xyz
            //result:- https://example.com/image.png
            const cleanUrl = image.split('?')[0]


            //it extracts the file extension 
            const ext = path.extname(cleanUrl) || '.jpg'


            //creates a temporary filename for saving locally 
            const tempPath = `./public/temp/temp_${Date.now()}${ext}`;
            
            // response.data is the raw image binary that we get from arraybuffer 
            fs.writeFileSync(tempPath, axiosresponse.data)

            const result = await uploadResultonCloudinary(tempPath)
            finalimageUrl = result.secure_url

            // delete temp
            try {
                fs.unlinkSync(tempPath);
            } catch (err) {
                console.warn('Failed to delete temp file:', err.message);
            }
        } else {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }



        const book = await Books.create({
            title,
            tags: tags.split(",").map((t) => t.trim()),
            description,
            image: finalimageUrl,
        })

        res.status(201).json({ success: true, data: book })
    } catch (error) {
        console.log(`Upload Error`, error);
        res.status(500).json({ success: false, message: "SerVer Error" })
    }
}


export const getAllBooks = async (req, res) => {
    const books = await Books.find();
    res.json({ success: true, data: books })
}