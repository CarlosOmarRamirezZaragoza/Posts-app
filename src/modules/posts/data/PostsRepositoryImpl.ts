/**
 * Developer: CORZ (https://www.linkedin.com/in/omar-ramirez-6a51b7141/)
 * Date: 2026-10-12
 * Description: PostsRepositoryImpl — the concrete implementation of PostsRepository.
 *
 * ARCHITECTURE NOTE:
 *   This class is the bridge between the data layer (API + DTOs) and the domain layer
 *   (entities + repository interface). It's the only place where:
 *     1. PostsApi is called (raw HTTP).
 *     2. Mappers transform DTOs to domain entities.
 *     3. groupCommentCountByPostId derives the count map (O(n), single request).
 *
 *   WHY a singleton export (postsRepository) instead of a class factory?
 *   For this feature scope, a singleton is pragmatic. No need for DI containers.
 *   Tests can swap this by mocking the module.
 */

import type { Comment, CommentCountMap, Post } from '@/modules/posts/domain/entities';
import type { PostsRepository } from '@/modules/posts/domain/PostsRepository';

import { PostsApi } from './PostsApi';
import { groupCommentCountByPostId, mapCommentDTOtoComment, mapPostDTOtoPost } from './mappers';

class PostsRepositoryImpl implements PostsRepository {
  async getPosts(): Promise<Post[]> {
    const dtos = await PostsApi.fetchPosts();
    return dtos.map(mapPostDTOtoPost);
  }

  async getCommentCountMap(): Promise<CommentCountMap> {
    // Fetch ALL comments in one request, then derive a count map.
    // This avoids the N+1 problem where we'd fire 100 requests for 100 posts.
    const dtos = await PostsApi.fetchAllComments();
    return groupCommentCountByPostId(dtos);
  }

  async getCommentsByPostId(postId: number): Promise<Comment[]> {
    const dtos = await PostsApi.fetchCommentsByPostId(postId);
    return dtos.map(mapCommentDTOtoComment);
  }
}

// Singleton instance — hooks import this directly.
// If we needed DI (e.g. for testing with a mock), we'd inject it via React context.
export const postsRepository: PostsRepository = new PostsRepositoryImpl();
