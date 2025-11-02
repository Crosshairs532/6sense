import dotenv from "dotenv";

dotenv.config({ path: process.cwd() + "/.env" });

export const configFiles = {
  node_env: process?.env?.NODE_ENV,
  logging_level: process?.env?.NODE_ENV === "dev" ? "debug" : "info",
  mongodb_url: process?.env?.MONGODB_URL || "mongodb://127.0.0.1:27017/test",
  port: process?.env?.PORT || 3000,
  cloudinary: {
    cloudinary_name: process?.env?.CLOUDINARY_NAME,
    cloudinary_api: process?.env?.CLOUDINARY_API,
    cloudinary_secret: process?.env?.CLOUDINARY_SECRET,
  },
};
