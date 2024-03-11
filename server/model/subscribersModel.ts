
import mongoose from 'mongoose';

const subscribersModel = new mongoose.Schema({
    name: String,
    email: String,
}, {
    timestamps: true
})

interface SubscriberI {
    name: string;
    email: string;
}

export interface SubscribersDocument extends mongoose.Document,SubscriberI {
    createdAt: Date;
    updatedAt: Date;
}

const Subscriber = mongoose.model<SubscribersDocument>('Subscriber', subscribersModel);

export default Subscriber;