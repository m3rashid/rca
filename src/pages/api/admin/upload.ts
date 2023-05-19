import multer from 'multer';
import nextConnect from 'next-connect';
import { v2 as cloudinary } from 'cloudinary';
import { NextApiRequest, NextApiResponse } from 'next';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    public_id: (req, file) => Date.now() + '-' + file.originalname,
  },
});

const upload = multer({ storage });

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>();
export const config = {
  api: {
    bodyParser: false,
  },
};

apiRoute.use(upload.single('file'));

apiRoute.post(async (req, res) => {
  // @ts-ignore
  const file = req.file;
  return res.status(200).json({ url: file.path, name: file.filename });
});

export default apiRoute;
