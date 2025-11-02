import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { configFiles } from "../config";
import logger from "../config/logger";
const multer = require("multer");

cloudinary.config({
  cloud_name: configFiles.cloudinary.cloudinary_name,
  api_key: configFiles.cloudinary.cloudinary_api,
  api_secret: configFiles.cloudinary.cloudinary_secret,
});

export const Cloudinary = (
  imageName: string,
  path: string
): Promise<Record<string, unknown>> => {
  const cloudOptions = {
    public_id: imageName,
  };
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      {
        public_id: imageName.trim(),
      },
      function (error: any, result: any) {
        if (error) {
          logger.error("Error uploading image to Cloudinary:", error);
          reject(error);
        }

        resolve(result);
        logger.info("Image uploaded to Cloudinary successfully:", result);
        fs.unlink(path, (error) => {
          if (error) {
            logger.error("Error uploading image to Cloudinary:", error);
          } else {
            logger.info("Temporary file deleted:", imageName);
          }
        });
      }
    );
  });
};

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, process.cwd() + "/uploads/");
  },
  filename: function (req: any, file: any, cb: any) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
