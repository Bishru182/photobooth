const mongoose = require("mongoose");

const photoSessionSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    capturedByEmail: {
      type: String,
      default: "",
    },
    emailSentTo: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const PhotoSession = mongoose.model("PhotoSession", photoSessionSchema);

module.exports = PhotoSession;
