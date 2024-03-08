import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Message = mongoose.model('Message', messageSchema);

export default Message
