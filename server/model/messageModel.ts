
import mongoose, { Document } from 'mongoose';

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    subscribed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

interface MessageI {
    name: string;
    subject: string;
    email: string;
    message: string;
    subscribed: boolean;
}

export interface MessageDocument extends MessageI, Document {
    createdAt: Date;
    updatedAt: Date;
}

const Message = mongoose.model<MessageDocument>('Message', messageSchema);

export default Message;