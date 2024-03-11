
import mongoose from 'mongoose';

interface UserI {
    username: string;
    password: string;
    email: string;
    profile: string;
    isAdmin: boolean;
}

export interface UserDocument extends UserI, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profile: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;