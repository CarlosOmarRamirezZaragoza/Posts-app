/**
 * Developer: CORZ (https://www.linkedin.com/in/omar-ramirez-6a51b7141/)
 * Date: 2026-10-12
 * Description: Mappers — transforms API DTOs into clean domain entities.
 *
 * ARCHITECTURE NOTE (Mapper/Adapter pattern):
 *   Mappers are pure functions with no side effects and no framework dependencies.
 *   This makes them trivially unit-testable (see __tests__/mappers.test.ts).
 *   The data layer owns mapping; the domain layer stays pristine.
 *
 *   groupCommentsByPostId is a "selector" function — it derives CommentCountMap
 *   from a flat list of CommentDTOs in O(n) time. Called once after fetching all
 *   comments so we never issue N per-post comment requests.
 */

import type { Comment, CommentCountMap, Post } from '@/modules/posts/domain/entities';

import type { CommentDTO, PostDTO } from './dtos';

/** Maps a single PostDTO → Post domain entity */
export function mapPostDTOtoPost(dto: PostDTO): Post {
  return {
    id: dto.id,
    userId: dto.userId,
    title: dto.title,
    body: dto.body,
  };
}

/** Maps a single CommentDTO → Comment domain entity */
export function mapCommentDTOtoComment(dto: CommentDTO): Comment {
  return {
    id: dto.id,
    postId: dto.postId,
    name: dto.name,
    email: dto.email,
    body: dto.body,
  };
}

/**
 * Derives a Record<postId, count> from a flat array of CommentDTOs.
 * O(n) time — single pass. Called once after the bulk /comments request.
 * WHY CommentDTO and not Comment: we can call this before or after mapping;
 * both have the same `postId` shape.
 */
export function groupCommentCountByPostId(comments: CommentDTO[]): CommentCountMap {
  return comments.reduce<CommentCountMap>((acc, comment) => {
    acc[comment.postId] = (acc[comment.postId] ?? 0) + 1;
    return acc;
  }, {});
}
