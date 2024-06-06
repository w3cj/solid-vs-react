import Comment from "@/components/Comment";
import { getStory } from "@/lib/api";
import { StoryDefinition } from "@/types";
import Link from "next/link";

export type StoryProps = { params: { id: string } };

export default async function Story({ params }: StoryProps) {
  const result = await getStory(params.id);
  const story = result as StoryDefinition;

  return (
    <div className="item-view">
      {"error" in result ? (
        <div className="item-view-header">
          <h1>Story not found.</h1>
        </div>
      ) : (
        <>
          <div className="item-view-header">
            <a href={story.url} target="_blank">
              <h1>{story.title}</h1>
            </a>
            {story.domain && <span className="host">({story.domain})</span>}
            <p className="meta">
              {story.points} points | by{" "}
              <Link href={`/users/${story.user}`}>{story.user}</Link>{" "}
              {story.time_ago} ago
            </p>
          </div>
          <div className="item-view-comments">
            <p className="item-view-comments-header">
              {story.comments_count
                ? story.comments_count + " comments"
                : "No comments yet."}
            </p>
            <ul className="comment-children">
              {story.comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
