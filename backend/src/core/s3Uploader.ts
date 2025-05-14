import multer, { FileFilterCallback } from "multer";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
import { Request } from "express";
import config from "./config";

dotenv.config();

// ✅ Setup AWS S3 client
const s3 = new S3Client({
  region: config.s3Bucket.region,
  credentials: {
    accessKeyId: config.s3Bucket.accessKeyId,
    secretAccessKey: config.s3Bucket.secretAccessKey,
  },
});

// ✅ Multer storage - buffer files in memory
const storage = multer.memoryStorage();

// ✅ File filter to only allow images
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Only JPEG and PNG images are allowed"));
  }
  cb(null, true);
};

// ✅ Multer instance with limits
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // Max 2MB
});

// ✅ Upload a file buffer to S3
export const uploadToS3 = async (file: Express.Multer.File): Promise<string> => {
  const bucketName = config.s3Bucket.bucketName;
  const region = config.s3Bucket.region;
  const key = `products/${Date.now()}-${file.originalname}`;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  await s3.send(command);

  return `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
};

// ✅ Generate a temporary signed URL for a file in S3
export const generateSignedUrl = async (key: string): Promise<string> => {
  const command = new GetObjectCommand({
    Bucket: config.s3Bucket.bucketName!,
    Key: key,
  });

  return getSignedUrl(s3, command, { expiresIn: 3600 }); // 1 hour
};
