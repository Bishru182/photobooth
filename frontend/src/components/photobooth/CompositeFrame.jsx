import React, { useEffect } from "react";
import frameImage from "../../assets/frames/photobooth-frame.png";

function CompositeFrame({ photos, onReady }) {
  useEffect(() => {
    if (!photos || photos.length !== 3) return;

    const loadImage = (src) =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.crossOrigin = "anonymous";
        img.src = src;
      });

    (async () => {
      try {
        const [img1, img2, img3, frame] = await Promise.all([
          loadImage(photos[0]),
          loadImage(photos[1]),
          loadImage(photos[2]),
          loadImage(frameImage),
        ]);

        // Instagram story canvas: 1080 x 1920 (9:16)
        const canvas = document.createElement("canvas");
        const width = 1080;
        const height = 1920;
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");

        // background (in case frame has transparent bits)
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);

        // draw frame (red bg + logo etc.)
        ctx.drawImage(frame, 0, 0, width, height);

        // -------- PHOTO LAYOUT (CONTAIN, no cropping) --------
        const marginX = 10; // side padding
        const marginYTop = 200; // header space for event name
        const slotWidth = width - marginX * 2; // 1080 - 160 = 920
        const slotHeight = 440; // height of each photo slot
        const gap = 70; // vertical spacing between slots

        const images = [img1, img2, img3];

        images.forEach((img, index) => {
          const slotY = marginYTop + index * (slotHeight + gap);

          // CONTAIN: scale image to fully fit inside slot, no cropping
          const scale = Math.min(
            slotWidth / img.width,
            slotHeight / img.height
          );
          const drawW = img.width * scale;
          const drawH = img.height * scale;

          // center inside the slot
          const dx = marginX + (slotWidth - drawW) / 2;
          const dy = slotY + (slotHeight - drawH) / 2;

          ctx.drawImage(img, dx, dy, drawW, drawH);
        });

        const dataUrl = canvas.toDataURL("image/png");
        if (onReady) onReady(dataUrl);
      } catch (err) {
        console.error("Error composing final frame:", err);
      }
    })();
  }, [photos, onReady]);

  return null;
}

export default CompositeFrame;
