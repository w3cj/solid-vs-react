import { useEffect, useRef, useState } from "react";
import { Photo } from "../types";

export default function ImageLoader({ photo }: { photo: Photo }) {
  const [imgSrc, setImgSrc] = useState("");
  const imgRef = useRef(null);

  useEffect(() => {
    const loadImage = () => {
      const img = new Image();
      img.onload = () => {
        setImgSrc(photo.src.large);
      };
      img.src = photo.src.large;
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setImgSrc(photo.src.small);
          loadImage();
          observer.unobserve(entry.target);
        }
      });
    });

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [photo, imgRef]);

  return (
    <img
      ref={imgRef}
      className="loading-image"
      style={{
        aspectRatio: photo.width / photo.height,
      }}
      src={imgSrc}
      alt={photo.alt}
    />
  );
}
