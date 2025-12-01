const mongoose = require("mongoose");

const photoSessionSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    emailSentTo: {
      type: String,
      default: "", // empty if no email yet
    },
  },
  {
    timestamps: true, // adds createdAt, updatedAt
  }
);

const PhotoSession = mongoose.model("PhotoSession", photoSessionSchema);

module.exports = PhotoSession;
