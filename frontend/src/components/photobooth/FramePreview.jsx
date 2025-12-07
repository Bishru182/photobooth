import React from "react";

function FramePreview({ photos, maxPhotos = 3 }) {
  if (!photos || photos.length === 0) {
    return (
      <div className="border border-dashed border-slate-300 rounded-md
       p-6 text-center text-xs text-slate-500">
        Captured photos will appear here.
      </div>
    );
  }

  return (
    <div className="border border-dashed border-slate-200 rounded-2xl p-4 bg-white/0 shadow-sm">
      <p className="text-xs text-slate-300 mb-3">
        Preview ({photos.length}/{maxPhotos} photos)
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {photos.map((src, idx) => (
          <div
            key={idx}
            className="rounded-xl overflow-hidden border border-slate-200"
          >
            <img
              src={src}
              alt={`Captured ${idx + 1}`}
              className="w-full h-32 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FramePreview;
