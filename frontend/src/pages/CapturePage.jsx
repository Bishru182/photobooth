import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CameraView from "../components/photobooth/CameraView";
import FramePreview from "../components/photobooth/FramePreview";
import CompositeFrame from "../components/photobooth/CompositeFrame";
import Navbar from "../components/layout/Navbar";

function CapturePage() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [finalImage, setFinalImage] = useState(null);

  const maxPhotos = 3;

  const handleCapture = (imageSrc) => {
    setPhotos((prev) => {
      if (prev.length >= maxPhotos) return prev;

      const updated = [...prev, imageSrc];

      // if this is the first photo in a new sequence, clear old final image
      if (updated.length === 1) {
        setFinalImage(null);
      }

      return updated;
    });
  };

  const handleReset = () => {
    setPhotos([]);
    setFinalImage(null);
  };

  const handleNext = () => {
    if (!finalImage) {
      alert("Final image not ready yet.");
      return;
    }

    navigate("/preview", {
      state: {
        finalImage,
        photos,
      },
    });
  };

  const remaining = maxPhotos - photos.length;

  return (
    <main className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg p-6 sm:p-8 lg:p-10">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800">
              Capture Photos
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Take {maxPhotos} photos for your photobooth strip.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left: Camera */}
            <div className="flex flex-col gap-4">
              <CameraView
                onCapture={handleCapture}
                disabled={photos.length >= maxPhotos}
              />
              <p className="text-xs text-center text-slate-500">
                {photos.length < maxPhotos
                  ? `Capture ${remaining} more photo${
                      remaining === 1 ? "" : "s"
                    }.`
                  : "All photos captured. You can reset or continue."}
              </p>
            </div>

            {/* Right: Preview + controls */}
            <div className="flex flex-col gap-4">
              {/* Small grid preview of the 3 individual photos */}
              <FramePreview photos={photos} maxPhotos={maxPhotos} />

              {/* When we have all 3 photos, build the composite with the frame */}
              {photos.length === maxPhotos && (
                <>
                  {/* This component doesn't render UI, it just calls setFinalImage when ready */}
                  <CompositeFrame photos={photos} onReady={setFinalImage} />

                  {/* Final framed image preview */}
                  {finalImage && (
                    <div className="border border-slate-200 rounded-2xl p-4 bg-white shadow-sm">
                      <p className="text-xs text-slate-500 mb-3">
                        Final frame preview
                      </p>
                      <img
                        src={finalImage}
                        alt="Final framed photobooth image"
                        className="w-full max-h-[400px] object-contain rounded-xl border border-slate-200"
                      />
                    </div>
                  )}
                </>
              )}

              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 border border-slate-300 text-slate-700 py-2.5 rounded-xl text-sm hover:bg-slate-50 transition disabled:opacity-50"
                  disabled={photos.length === 0}
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 bg-slate-900 text-white py-2.5 rounded-xl text-sm hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={photos.length !== maxPhotos || !finalImage}
                >
                  Continue
                </button>
              </div>

              <p className="text-[11px] text-slate-400">
                Tip: Make sure the faces are clearly visible in each photo. Once
                all 3 are captured, we&apos;ll automatically place them into your
                custom frame.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CapturePage;
