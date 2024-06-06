import { For, Show, createResource, createSignal } from "solid-js";
import getImages from "./api";
import ImageLoader from "./components/ImageLoader";

const App = () => {
  const [searchTerm, setSearchTerm] = createSignal("");
  const [images] = createResource(() => searchTerm(), () => getImages(searchTerm()));

  return (
    <>
      <h1>Solid Image Search</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          setSearchTerm(formData.get("searchTerm") as string);
        }}
      >
        <label for="searchTerm">Search Term</label>
        <input
          class="u-full-width"
          type="text"
          id="searchTerm"
          name="searchTerm"
        />
        <button type="submit">Search</button>
      </form>
      <Show when={images.loading}>
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
