/**
 * Developer: CORZ (https://www.linkedin.com/in/omar-ramirez-6a51b7141/)
 * Date: 2026-10-12
 * Description: Data Transfer Objects (DTOs) — the raw shape of API responses.
 *
 * WHY separate DTOs from domain entities?
 *   The API can change (rename fields, add snake_case, add nested objects) without
 *   touching domain entities. Mappers absorb those changes in isolation.
 *   Also, DTOs are typed as 'unknown' on the wire — we validate the shape here.
 */

/** Raw shape of a post object from GET /posts */
export interface PostDTO {
  id: number;
  userId: number;
  title: string;
  body: string;
}

/** Raw shape of a comment object from GET /comments */
export interface CommentDTO {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}
