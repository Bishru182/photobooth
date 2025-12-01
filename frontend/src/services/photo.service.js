import apiClient from "./apiClient";

export const uploadFinalPhoto = async (finalImage) => {
  const res = await apiClient.post("/photos/upload", {
    image: finalImage, // base64 PNG
  });
  return res.data; // { url, public_id, message, sessionId }
};

export const sendPhotoEmail = async (email, imageUrl, sessionId) => {
  const res = await apiClient.post("/photos/send-email", {
    email,
    imageUrl,
    sessionId, //  backend can update that record
  });
  return res.data; // { message: "Email sent successfully" }
};
