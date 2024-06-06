import { getUser } from "@/lib/api";
import { UserDefinition } from "@/types";

export type UserProps = { params: { id: string } };

export default async function User({ params }: UserProps) {
  const result = await getUser(params.id);
  const user = result as UserDefinition;

  return (
    <div className="user-view">
      {"error" in result ? (
        <h1>User not found.</h1>
      ) : (
        <>
          <h1>User : {user.id}</h1>
          <ul className="meta">
            <li>
              <span className="label">Created:</span> {user.created}
            </li>
            <li>
              <span className="label">Karma:</span> {user.karma}
            </li>
            {user.about && (
              <>
                <li
                  dangerouslySetInnerHTML={{ __html: user.about }}
                  className="about"
                />{" "}
              </>
            )}
          </ul>
          <p className="links">
            <a href={`https://news.ycombinator.com/submitted?id=${user.id}`}>
              submissions
            </a>{" "}
            |{" "}
            <a href={`https://news.ycombinator.com/threads?id=${user.id}`}>
              comments
            </a>
          </p>
        </>
      )}
    </div>
  );
}
