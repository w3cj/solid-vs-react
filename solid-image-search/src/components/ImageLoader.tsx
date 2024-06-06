import { createSignal, onCleanup } from "solid-js";
import { Photo } from "../types";

export default function ImageLoader({ photo }: { photo: Photo }) {
  const [imgSrc, setImgSrc] = createSignal("");

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
        setImgSrc(photo.src.small)
        loadImage();
        observer.unobserve(entry.target);
      }
    });
  });

  onCleanup(() => {
    observer.disconnect();
  });

  return (
    <img
      ref={(element) => observer.observe(element)}
      class="loading-image"
      style={{
        "aspect-ratio": photo.width / photo.height,
      }}
      src={imgSrc()}
      alt={photo.alt}
    />
  );
}
