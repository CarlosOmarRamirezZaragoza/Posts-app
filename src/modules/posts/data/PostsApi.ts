/**
 * Developer: CORZ (https://www.linkedin.com/in/omar-ramirez-6a51b7141/)
 * Date: 2026-10-12
 * Description: Posts API — thin wrappers around Axios for each endpoint.
 *
 * WHY a dedicated PostsApi vs calling apiClient directly in the repository?
 *   Separating the HTTP call (PostsApi) from the data transformation (repository)
 *   keeps each piece focused. PostsApi knows about endpoints and DTOs.
 *   PostsRepositoryImpl knows about mapping and the domain contract.
 */

import { apiClient } from '@/core/api/apiClient';

import type { CommentDTO, PostDTO } from './dtos';

export const PostsApi = {
  /** GET /posts — all posts */
  async fetchPosts(): Promise<PostDTO[]> {
    const { data } = await apiClient.get<PostDTO[]>('/posts');
    return data;
  },

  /** GET /comments — all comments (used to compute comment counts in one shot) */
  async fetchAllComments(): Promise<CommentDTO[]> {
    const { data } = await apiClient.get<CommentDTO[]>('/comments');
    return data;
  },

  /** GET /comments?postId={id} — comments for a specific post (detail screen) */
  async fetchCommentsByPostId(postId: number): Promise<CommentDTO[]> {
    const { data } = await apiClient.get<CommentDTO[]>('/comments', {
      params: { postId },
    });
    return data;
  },
};
