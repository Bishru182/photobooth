import apiClient from "./apiClient";

export const uploadFinalPhoto = async (finalImage) => {
  const userEmail = localStorage.getItem("userEmail") || "";

  const res = await apiClient.post("/photos/upload", {
    image: finalImage, // base64 PNG
    userEmail,
  });
  return res.data; // { url, public_id, message, sessionId }
};

export const sendPhotoEmail = async (email, imageUrl, sessionId) => {
  const res = await apiClient.post("/photos/send-email", {
    email,
    imageUrl,
    sessionId,
  });
  return res.data; // { message: "Email sent successfully" }
};

export const getPhotoSessions = async () => {
  const res = await apiClient.get("/photos/sessions");
  return res.data; // array of sessions
};
