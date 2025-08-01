import mongoose, { Schema } from 'mongoose'

const  BooksSchema  = new Schema({
    title:{ 
        type:String,
        required:true,
        trim:true
    }, 
    tags:{
        type:[String],
        default:[]
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    state: {
    type:String,
    enum:['ONGOING','COMPLETED','N/A'],
    default:'N/A'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export const Books = mongoose.model('Books',BooksSchema,'Books')