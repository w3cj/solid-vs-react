import Link from "next/link";
import type { StoryDefinition } from "../types";

const Story = ({ story }: { story: StoryDefinition }) => {
  return (
    <li className="news-item">
      <span className="score">{story.points}</span>
      <span className="title">
        {story.url ? (
          <>
            <a href={story.url} target="_blank" rel="noreferrer">
              {story.title}
            </a>
            <span className="host"> ({story.domain})</span>
          </>
        ) : (
          <Link href={`/item/${story.id}`}>{story.title}</Link>
        )}
      </span>
      <br />
      <span className="meta">
        {story.type !== "job" ? (
          <>
            by <Link href={`/users/${story.user}`}>{story.user}</Link>{" "}
            {story.time_ago} |{" "}
            <Link href={`/stories/${story.id}`}>
              {story.comments_count
                ? `${story.comments_count} comments`
                : "discuss"}
            </Link>
          </>
        ) : (
          <Link href={`/stories/${story.id}`}>{story.time_ago}</Link>
        )}
      </span>
      {story.type !== "link" && (
        <>
          {" "}
          <span className="label">{story.type}</span>
        </>
      )}
    </li>
  );
};

export default Story;
