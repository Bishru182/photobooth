// backend/src/services/email.service.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // using Gmail
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendPhotoEmail = async (toEmail, imageUrl) => {
  const fromEmail = process.env.EMAIL_FROM || process.env.EMAIL_USER;

  const mailOptions = {
    from: fromEmail,
    to: toEmail,
    subject: "Your Photobooth Picture 🎉",
    html: `
      <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 16px; background:#f4f4f5;">
        <h2 style="margin-bottom: 8px;">Thanks for using the photobooth!</h2>
        <p style="margin-top:0; margin-bottom:16px; color:#374151;">
          Here is your framed photo, ready to share on Instagram Stories.
        </p>
        <div style="background:white; padding:16px; border-radius:16px; text-align:center;">
          <img src="${imageUrl}" alt="Photobooth frame" style="max-width:100%; border-radius:16px;" />
        </div>
        <p style="margin-top:16px; color:#4b5563;">
          If the image does not load, you can open it directly using this link:<br/>
          <a href="${imageUrl}" style="color:#2563eb;">${imageUrl}</a>
        </p>
        <p style="margin-top:12px; color:#4b5563;">
          We've also attached the image as a file so you can download it directly.
        </p>
      </div>
    `,
    // ✅ Attach the Cloudinary image so it shows as a downloadable file
    attachments: [
      {
        filename: "photobooth.png",
        path: imageUrl, // Cloudinary URL
      },
    ],
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendPhotoEmail,
};
