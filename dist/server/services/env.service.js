"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = void 0;
exports.environment = {
    PORT: process.env.PORT,
    MONGODB_URL: `${process.env.MONGODB_URL}`,
    CLOUDINARY_NAME: `${process.env.CLOUDINARY_NAME}`,
    CLOUDINARY_KEY: `${process.env.CLOUDINARY_KEY}`,
    CLOUDINARY_SECRET_KEY: `${process.env.CLOUDINARY_SECRET_KEY}`
};
