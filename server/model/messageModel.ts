
import mongoose from 'mongoose';

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

const Message = mongoose.model('Message', messageSchema);

export default Message;