
import mongoose from 'mongoose';


interface BlogI {
    title: string;
    content: string;
    image: string;
}


const blogSchema = new mongoose.Schema({
    title:String,
    content:String,
    image:String,
}, {
    timestamps: true
})

export interface BlogDocument extends BlogI, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const Blog = mongoose.model<BlogDocument>('Blog', blogSchema);

export default Blog;