/**
 * Developer: CORZ (https://www.linkedin.com/in/omar-ramirez-6a51b7141/)
 * Date: 2026-10-12
 * Description: Domain entities — the pure data models of the Posts feature.
 *
 * ARCHITECTURE NOTE (Domain layer):
 *   These types have ZERO framework imports. They represent the business concepts
 *   independently of how data arrives (API) or is displayed (UI).
 *   - Post: the thing users read and favorite.
 *   - Comment: the thing shown in the post detail.
 *   - CommentCountMap: derived data (Record<postId, count>) computed from all comments
 *     once, avoiding N+1 requests.
 */

/** Core Post entity. Derived from the JSONPlaceholder /posts response. */
export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

/** Post enriched with its comment count — composed in a selector/hook, not in the UI. */
export interface PostWithCommentCount extends Post {
  commentCount: number;
}

/** Core Comment entity. Derived from the JSONPlaceholder /comments response. */
export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

/**
 * Derived data structure: maps postId → number of comments.
 * Built once from the full /comments response to avoid N+1 requests.
 * WHY Record instead of Map: JSON-serializable, works seamlessly with React state.
 */
export type CommentCountMap = Record<number, number>;
