// backend/src/routes/photo.routes.js
const express = require("express");
const {
  uploadFinalPhoto,
  sendPhotoByEmail,
} = require("../controllers/photo.controller");

const router = express.Router();

router.post("/upload", uploadFinalPhoto);
router.post("/send-email", sendPhotoByEmail);

module.exports = router;
