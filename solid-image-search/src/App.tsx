import { For, Show, createSignal } from "solid-js";
import getImages from "./api";
import { Photo } from "./types";
import ImageLoader from "./components/ImageLoader";

const App = () => {
  const [loading, setLoading] = createSignal(false);
  const [images, setImages] = createSignal<Photo[]>([]);

  const onSubmit = async (
    event: Event & {
      currentTarget: HTMLFormElement;
    }
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
      <h1>Solid Image Search</h1>
      <form onSubmit={onSubmit}>
        <label for="searchTerm">Search Term</label>
        <input
          class="u-full-width"
          type="text"
          id="searchTerm"
          name="searchTerm"
        />
        <button type="submit">Search</button>
      </form>
      <Show when={loading()}>
        <img
          alt="loading"
          id="loadingImage"
          src="https://i.imgur.com/LVHmLnb.gif"
        />
      </Show>
      <section class="images">
        <For each={images()}>{(photo) => <ImageLoader photo={photo} />}</For>
      </section>
    </>
  );
};

export default App;
