import { formatPostDate, type PostMeta } from "../../lib/content";
import { sitePath } from "../../lib/site";

export function PostList({ posts }: { posts: PostMeta[] }) {
  return (
    <div className="clean-post-list">
      {posts.map((post) => (
        <article className="clean-post" key={post.slug}>
          <p className="clean-post-meta">
            <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
            <span aria-hidden="true"> · </span>
            {post.readingTime}
          </p>
          <h3><a href={sitePath(`/writing/${post.slug}/`)}>{post.title}</a></h3>
          <p className="clean-post-description">{post.description}</p>
          <p className="clean-post-topics">{post.topics.join(" · ")}</p>
        </article>
      ))}
    </div>
  );
}
