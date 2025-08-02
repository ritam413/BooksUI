import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import connectDB from './db/connectDB.js'
import uploadRoutes from './routes/books.route.js'
import app from './app.js'


dotenv.config({
    path:'./.env'
})

// connecting Dateabase 
connectDB()
.then(()=>{
    const server = app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is Running on PORT: ${process.env.PORT}`)
    })
    server.on('error',(error)=>{
        console.log(`Error ${error}`);
        throw error 
    })
})
.catch((err)=>{
    console.log(`MongoDb Connection Failed: `,err);
    
})


// app.use('/api/v1/books',uploadRoutes)//this is for development

app.use('/books',uploadRoutes)//this is for development 
