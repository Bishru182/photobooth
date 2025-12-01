const cloudinary = require("../config/cloudinary");
const { sendPhotoEmail } = require("../services/email.service");
const PhotoSession = require("../models/PhotoSession");

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

    // 1️⃣ Create a PhotoSession with empty emailSentTo
    const session = await PhotoSession.create({
      imageUrl: uploadResponse.secure_url,
      emailSentTo: "", // no email yet
    });

    return res.status(200).json({
      message: "Image uploaded successfully",
      url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id,
      sessionId: session._id, // 👈 send this to frontend
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
    const { email, imageUrl, sessionId } = req.body;

    if (!email || !imageUrl) {
      return res
        .status(400)
        .json({ message: "Email and imageUrl are required" });
    }

    console.log(`Sending photobooth image to ${email}: ${imageUrl}`);

    // 1️⃣ Send the email
    await sendPhotoEmail(email, imageUrl);

    // 2️⃣ If we have a sessionId, update that record
    if (sessionId) {
      await PhotoSession.findByIdAndUpdate(sessionId, {
        emailSentTo: email,
      });
    } else {
      // fallback: if no sessionId, create a new record (rare case)
      await PhotoSession.create({
        imageUrl,
        emailSentTo: email,
      });
    }

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
