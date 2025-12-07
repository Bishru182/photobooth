import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { uploadFinalPhoto, sendPhotoEmail } from "../services/photo.service";
import { QRCodeCanvas } from "qrcode.react";
import Navbar from "../components/layout/Navbar";
import Lottie from "lottie-react";
import bgi from "../assets/lottie/Let it snow.json"; // same bg as CapturePage

function PreviewPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [finalImage, setFinalImage] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [email, setEmail] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadUrl, setUploadUrl] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    if (location.state?.finalImage) {
      setFinalImage(location.state.finalImage);
      setPhotos(location.state.photos || []);
    } else {
      navigate("/capture");
    }
  }, [location.state, navigate]);

  const handleUpload = async () => {
    if (!finalImage) return;
    try {
      setIsUploading(true);
      setUploadUrl(null);

      const res = await uploadFinalPhoto(finalImage);
      setUploadUrl(res.url);
      setSessionId(res.sessionId || null); // store session id

      alert("Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = () => {
    if (!finalImage) return;
    const a = document.createElement("a");
    a.href = finalImage;
    a.download = "photobooth-story.png";
    a.click();
  };

  const handleSendEmail = async () => {
    if (!email.trim()) {
      alert("Please enter an email address.");
      return;
    }
    if (!uploadUrl) {
      alert("Please upload the image first.");
      return;
    }
    try {
      await sendPhotoEmail(email.trim(), uploadUrl, sessionId);
      alert("Photo sent to email successfully!");
    } catch (err) {
      console.error("Email error:", err.response?.data || err);
      alert(
        "Failed to send email: " +
          (err.response?.data?.error ||
            err.response?.data?.message ||
            "Please try again.")
      );
    }
  };

  return (
    <div className="relative min-h-screen bg-bishblue overflow-hidden">
      {/* === LOTTIE BACKGROUND === */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Lottie
          animationData={bgi}
          loop
          autoplay
          className="w-full h-full object-cover scale-[1] backdrop-blur-xs"
        />
      </div>

      {/* Top navbar (full width) */}
      <div className="relative z-10">
        <Navbar />
      </div>

      {/* Main content centered below navbar */}
      <main className="relative z-10 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-5xl bg-gradient-to-t from-blue-700/20 to-white/0 rounded-3xl shadow-lg p-6 sm:p-8 lg:p-10 backdrop-blur-md">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-slate-100">
                Preview &amp; Share
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Your final framed photobooth image is ready to download, upload,
                or share.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate("/capture")}
              className="text-xs sm:text-sm text-slate-300 hover:text-slate-100"
            >
              ← Back to Capture
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* LEFT SIDE — Final image */}
            <div className="flex flex-col gap-4">
              {finalImage ? (
                <div className="border border-slate-100/60 rounded-2xl p-4 bg-white/5 shadow-sm">
                  <p className="text-xs text-slate-200 mb-3">
                    Final Instagram Story frame
                  </p>
                  <img
                    src={finalImage}
                    alt="Final framed photobooth"
                    className="w-full max-h-[500px] object-contain rounded-xl border border-slate-100/40"
                  />
                </div>
              ) : (
                <p className="text-xs text-slate-200">
                  No image loaded. Returning to capture...
                </p>
              )}

              <button
                type="button"
                onClick={handleDownload}
                disabled={!finalImage}
                className="w-full bg-slate-100 text-slate-700 py-2.5 rounded-xl text-sm hover:bg-slate-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Download Image
              </button>
            </div>

            {/* RIGHT SIDE — Upload | Email | QR */}
            <div className="flex flex-col gap-4">
              {/* Step 1: Cloud Upload */}
              <div className="border border-slate-100/60 rounded-2xl p-4 bg-white/5 shadow-sm">
                <p className="text-xs text-slate-200 mb-3">
                  Step 1: Upload to Cloud
                </p>
                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={!finalImage || isUploading}
                  className="w-full bg-slate-100 text-slate-700 py-2.5 rounded-xl text-sm hover:bg-slate-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading
                    ? "Uploading..."
                    : "Upload to Cloud (Cloudinary)"}
                </button>

                {uploadUrl && (
                  <p className="text-[11px] text-slate-200 mt-2 break-all">
                    Uploaded URL:{" "}
                    <span className="text-slate-50">{uploadUrl}</span>
                  </p>
                )}
              </div>

              {/* Step 2: Email */}
              <div className="border border-slate-100/60 rounded-2xl p-4 bg-white/5 shadow-sm">
                <p className="text-xs text-slate-200 mb-3">
                  Step 2: Send to Email
                </p>
                <input
                  type="email"
                  placeholder="Enter email to send this photo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-slate-300/80 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-100 mb-3 bg-white/90"
                />
                <button
                  type="button"
                  onClick={handleSendEmail}
                  className="w-full border border-slate-300/80 text-slate-100 py-2.5 rounded-xl text-sm hover:bg-slate-800/70 transition"
                >
                  Send to this email
                </button>
              </div>

              {/* Step 3: QR Code */}
              {uploadUrl && (
                <div className="border border-slate-100/60 rounded-2xl p-4 bg-white/5 shadow-sm mt-2">
                  <p className="text-xs text-slate-200 mb-3">
                    Step 3: Scan to Download
                  </p>

                  <div className="flex justify-center">
                    <QRCodeCanvas
                      value={`${uploadUrl}?fl_attachment=photobooth.png`}
                      size={200}
                      bgColor="#ffffff"
                      fgColor="#000000"
                      level="H"
                      includeMargin={true}
                    />
                  </div>

                  <p className="text-[11px] text-slate-200 mt-3 text-center">
                    Scan the QR to open and download the final photo.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PreviewPage;
