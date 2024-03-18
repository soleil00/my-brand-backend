
import mongoose from 'mongoose';
import { CommentDocument } from './commentModel';


interface BlogI {
    title: string;
    content: string;
    image: string;
    comments: CommentDocument[],
    likes: mongoose.Types.ObjectId[];
}


const blogSchema = new mongoose.Schema({
    title:String,
    content:String,
    image: String,
    comments: [{
        type: mongoose.Types.ObjectId,
        ref: 'Comment'
    }],
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
    
}, {
    timestamps: true
})

export interface BlogDocument extends BlogI, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const Blog = mongoose.model<BlogDocument>('Blog', blogSchema);

export default Blog;