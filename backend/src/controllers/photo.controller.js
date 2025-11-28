// backend/src/controllers/photo.controller.js
const cloudinary = require("../config/cloudinary");
const { sendPhotoEmail } = require("../services/email.service");

const uploadFinalPhoto = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    console.log("Received image length:", image.length);

    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "photobooth",
      resource_type: "image",
      overwrite: false,
    });

    console.log("Cloudinary upload success:", uploadResponse.secure_url);

    return res.status(200).json({
      message: "Image uploaded successfully",
      url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id,
    });
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    return res.status(500).json({
      message: "Failed to upload image",
      error: err.message || "Unknown error",
    });
  }
};

const sendPhotoByEmail = async (req, res) => {
  try {
    const { email, imageUrl } = req.body;

    if (!email || !imageUrl) {
      return res
        .status(400)
        .json({ message: "Email and imageUrl are required" });
    }

    console.log(`Sending photobooth image to ${email}: ${imageUrl}`);

    await sendPhotoEmail(email, imageUrl);

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Send email error:", err);
    return res.status(500).json({
      message: "Failed to send email",
      error: err.message || "Unknown error",
    });
  }
};

module.exports = {
  uploadFinalPhoto,
  sendPhotoByEmail,
};
