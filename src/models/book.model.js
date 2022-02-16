import { Schema, model } from 'mongoose';


const bookSchema = new Schema(
    {
        title: {
            type: String,
        },
        author: {
            type: String,
        },
        image:{
            type:String
        },
        quantity:{
            type:Number
        },
        price:{
            type:Number
        },
        description:{
            type:String
        },
        year:{
            type:Number
        },
    },
    {
        timestamps: true
    }
);

export default model('Books', bookSchema);