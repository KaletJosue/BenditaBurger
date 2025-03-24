import jsonwebtoken from "jsonwebtoken"
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from "dotenv"

dotenv.config()

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: async (req, file) => {
        const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4);
        const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);

        return {
            folder: 'profile_pictures',
            public_id: decodificada.user,
            overwrite: true, 
            allowed_formats: ['jpg', 'png'],
        };
    },
});

const storage2 = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: async (req, file) => {
        return {
            folder: 'inventory_pictures',
            allowed_formats: ['jpg', 'png'],
        };
    },
});

const storage3 = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: async (req, file) => {
        return {
            folder: 'product_pictures',
            allowed_formats: ['jpg', 'png'],
        };
    },
});

const upload = multer({ storage });
const upload2 = multer({ storage: storage2 });
const upload3 = multer({ storage: storage3 });

export {
    upload,
    upload2,
    upload3
};