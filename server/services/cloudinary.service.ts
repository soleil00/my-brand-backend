import { environment } from "./env.service";

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dxy33wiax',
   api_key: '991555379284442',
   api_secret: 'ekuY9MDxVtiIeUGqKbLS0V8MTV4'
});

export default cloudinary;