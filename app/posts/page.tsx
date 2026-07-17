import { getSortedPostsData, PostData } from "@/lib/posts";
import PostsClient from "./PostsClient";

export default function PostsPage() {
  const posts: PostData[] = getSortedPostsData();

  return <PostsClient initialPosts={posts} />;
}