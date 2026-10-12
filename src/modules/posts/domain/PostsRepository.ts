/**
 * Developer: CORZ (https://www.linkedin.com/in/omar-ramirez-6a51b7141/)
 * Date: 2026-10-12
 * Description: PostsRepository interface — the dependency inversion boundary.
 *
 * ARCHITECTURE NOTE (Dependency Inversion Principle):
 *   The domain defines WHAT operations are available (the interface).
 *   The data layer provides HOW they are implemented (PostsRepositoryImpl).
 *   The presentation layer (hooks) depends only on this interface, not on Axios/API details.
 *
 *   WHY no use-case classes for simple pass-through?
 *   The repository contract is already a meaningful abstraction for this feature scope.
 *   Adding use-case classes (FetchPostsUseCase, etc.) would be over-engineering with no
 *   testability benefit since there's no business logic to isolate beyond what the mapper does.
 */

import type { Comment, CommentCountMap, Post } from './entities';

export interface PostsRepository {
  /** Fetches all posts from the remote API. */
  getPosts(): Promise<Post[]>;

  /**
   * Fetches ALL comments in a single request and builds a count map.
   * WHY all-at-once: fetching per postId would cause N+1 requests (100 posts = 100 HTTP calls).
   * Caller derives counts from the map: commentCountMap[postId] ?? 0.
   */
  getCommentCountMap(): Promise<CommentCountMap>;

  /** Fetches comments for a specific post (used on the detail screen). */
  getCommentsByPostId(postId: number): Promise<Comment[]>;
}
