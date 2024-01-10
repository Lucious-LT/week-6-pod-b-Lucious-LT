import * as mongoose from 'mongoose';


const PostSchema = new mongoose.Schema({
    title: {
    description: String,
    date: Date,
    },
    body: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt:{
        type: Date,
        default: Date.now,
    },
    
});
