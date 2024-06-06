import { useState } from "react";
import getImages from "./api";
import { Photo } from "./types";
import ImageLoader from "./components/ImageLoader";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<Photo[]>([]);

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setImages([]);
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const searchTerm = formData.get('searchTerm') as string;
    const images = await getImages(searchTerm);
    setImages(images);
    setLoading(false);
  };

  return (
    <>
      <h1>React Image Search</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="searchTerm">Search Term</label>
        <input
          className="u-full-width"
          type="text"
          id="searchTerm"
          name="searchTerm"
        />
        <button type="submit">Search</button>
      </form>
      {loading && (
        <img
          alt="loading"
          id="loadingImage"
          src="https://i.imgur.com/LVHmLnb.gif"
        />
      )}
      <section className="images">
        {images.map((photo) => (
          <ImageLoader key={photo.id} photo={photo} />
        ))}
      </section>
    </>
  );
};

export default App;
