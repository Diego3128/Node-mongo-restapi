import { v2 as cloudinary } from "cloudinary";
import { CLOUD_NAME, API_KEY, API_SECRET } from "../config.js";

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
});
// upload image to cloudinary
export async function uploadImage(filePath) {
    return await cloudinary.uploader.upload(filePath, {
        folder: "apitest",
    });
}
// delet image from cloudinary
export async function deleteImage(public_id) {
    return await cloudinary.uploader.destroy(public_id);
}
