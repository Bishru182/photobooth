import React, { useRef } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1920,
  height: 1080,
  facingMode: "user",
};

function CameraView({ onCapture, disabled }) {
  const webcamRef = useRef(null);

  const handleCaptureClick = () => {
    if (!webcamRef.current || disabled) return;
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc && onCapture) {
      onCapture(imageSrc);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="rounded-2xl overflow-hidden shadow-md bg-black">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          screenshotQuality={1.0}
          screenshotWidth={1920} // match canvas width
          videoConstraints={videoConstraints}
          className="w-full max-w-xl aspect-video object-cover"
        />
      </div>

      <button
        type="button"
        onClick={handleCaptureClick}
        disabled={disabled}
        className={`px-6 py-2.5 rounded-xl text-sm font-medium transition ${
          disabled
            ? "bg-slate-300 text-slate-500 cursor-not-allowed"
            : "bg-slate-100 text-slate-600 hover:bg-slate-300"
        }`}
      >
        {disabled ? "All photos captured" : "Capture photo"}
      </button>
    </div>
  );
}

export default CameraView;
