// frontend/src/services/photo.service.js
import apiClient from "./apiClient";

export const uploadFinalPhoto = async (finalImage) => {
  const res = await apiClient.post("/photos/upload", {
    image: finalImage, // base64 PNG
  });
  return res.data; // { url, public_id, message }
};

export const sendPhotoEmail = async (email, imageUrl) => {
  const res = await apiClient.post("/photos/send-email", {
    email,
    imageUrl,
  });
  return res.data; // { message: "Email sent successfully" }
};
