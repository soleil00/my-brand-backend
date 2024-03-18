
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
        required: true,
        unique: true
    },
    profile: {
        type: String,
        default:"https://up.yimg.com/ib/th?id=OIP.52T8HHBWh6b0dwrG6tSpVQHaFe&%3Bpid=Api&rs=1&c=1&qlt=95&w=156&h=115"
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;