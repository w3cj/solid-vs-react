import Story from "@/components/Story";
import { getStories } from "@/lib/api";
import { StoryTypes } from "@/types";
import Link from "next/link";

type HomeProps = {
  params: { stories: StoryTypes };
  searchParams: {
    page?: string;
  };
};

export default async function Home({ params, searchParams }: HomeProps) {
  const pageNum = Number(searchParams.page);
  const page = Number.isNaN(pageNum) ? 1 : pageNum;
  const type = (params.stories || "top") as StoryTypes;

  const stories = await getStories(type, page);
  const isError = 'error' in stories;

  return (
    <div className="news-view">
      <div className="news-list-nav">
        {page > 1 ? (
          <Link
            className="page-link"
            href={`/${type}?page=${page - 1}`}
            aria-label="Previous Page"
          >
            {"<"} prev
          </Link>
        ) : (
          <span className="page-link disabled" aria-disabled="true">
            {"<"} prev
          </span>
        )}

        <span>page {page}</span>
        {!isError && stories.length >= 29 ? (
          <Link
            className="page-link"
            href={`/${type}?page=${page + 1}`}
            aria-label="Next Page"
          >
            more {">"}
          </Link>
        ) : (
          <span className="page-link disabled" aria-disabled="true">
            more {">"}
          </span>
        )}
      </div>
      <main className="news-list">
        {isError ? (
          <p>No Stories</p>
        ) : stories.map((story) => (
          <Story key={story.id} story={story} />
        ))}
      </main>
    </div>
  );
}
