const cloudinary = require("../config/cloudinary");
const { sendPhotoEmail } = require("../services/email.service");
const PhotoSession = require("../models/PhotoSession");

const uploadFinalPhoto = async (req, res) => {
  try {
    const { image, userEmail } = req.body;

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

    // Create a PhotoSession for this upload
    const session = await PhotoSession.create({
      imageUrl: uploadResponse.secure_url,
      capturedByEmail: userEmail || "",
      emailSentTo: "",
    });

    return res.status(200).json({
      message: "Image uploaded successfully",
      url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id,
      sessionId: session._id,
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

    // Send the email
    await sendPhotoEmail(email, imageUrl);

    // Update existing session if sessionId is provided
    if (sessionId) {
      await PhotoSession.findByIdAndUpdate(sessionId, {
        emailSentTo: email,
      });
    } else {
      // Fallback: create a new record if no sessionId
      await PhotoSession.create({
        imageUrl,
        capturedByEmail: "",
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

const getPhotoSessions = async (req, res) => {
  try {
    const sessions = await PhotoSession.find({}).sort({ createdAt: -1 }).lean();

    return res.status(200).json(sessions);
  } catch (err) {
    console.error("Get photo sessions error:", err);
    return res.status(500).json({
      message: "Failed to fetch sessions",
      error: err.message || "Unknown error",
    });
  }
};

module.exports = {
  uploadFinalPhoto,
  sendPhotoByEmail,
  getPhotoSessions,
};
