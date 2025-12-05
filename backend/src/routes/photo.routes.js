const express = require("express");
const {
  uploadFinalPhoto,
  sendPhotoByEmail,
  getPhotoSessions,
} = require("../controllers/photo.controller");

const router = express.Router();

router.post("/upload", uploadFinalPhoto);
router.post("/send-email", sendPhotoByEmail);
router.get("/sessions", getPhotoSessions);

module.exports = router;
