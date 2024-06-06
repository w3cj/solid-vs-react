import { CommentDefinition } from "@/types";
import Link from "next/link";
import Toggle from "./Toggle";

const Comment= ({ comment }: { comment: CommentDefinition }) => {
  return (
    <li className="comment">
      <div className="by">
        <Link href={`/users/${comment.user}`}>{comment.user}</Link>{" "}
        {comment.time_ago} ago
      </div>
      <div className="text" dangerouslySetInnerHTML={{ __html: comment.content }} />
      {comment.comments.length ? (
        <Toggle>
          {comment.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </Toggle>
      ) : null}
    </li>
  );
};

export default Comment;
