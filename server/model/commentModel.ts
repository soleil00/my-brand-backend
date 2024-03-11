import mongoose from 'mongoose';

interface CommentI {
    author: string;
    content: string;
}

const commentSchema = new mongoose.Schema({
    author: String,
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export interface CommentDocument extends CommentI, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const Comment = mongoose.model<CommentDocument>('Comment', commentSchema);

export default Comment
