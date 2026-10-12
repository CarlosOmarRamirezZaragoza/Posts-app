/**
 * Developer: CORZ (https://www.linkedin.com/in/omar-ramirez-6a51b7141/)
 * Date: 2026-10-12
 * Description: Unit tests for DTO mappers and comment count aggregation.
 */

import { groupCommentCountByPostId, mapCommentDTOtoComment, mapPostDTOtoPost } from '../mappers';
import type { CommentDTO, PostDTO } from '../dtos';

describe('Posts mappers & aggregators', () => {
  describe('mapPostDTOtoPost', () => {
    it('correctly maps PostDTO to domain Post entity', () => {
      const dto: PostDTO = {
        userId: 1,
        id: 10,
        title: 'sunt aut facere repellat',
        body: 'quia et suscipit suscipit recusandae',
      };

      const entity = mapPostDTOtoPost(dto);

      expect(entity).toEqual({
        id: 10,
        userId: 1,
        title: 'sunt aut facere repellat',
        body: 'quia et suscipit suscipit recusandae',
      });
    });
  });

  describe('mapCommentDTOtoComment', () => {
    it('correctly maps CommentDTO to domain Comment entity', () => {
      const dto: CommentDTO = {
        postId: 10,
        id: 42,
        name: 'id labore ex et quam laborum',
        email: 'Eliseo@gardner.biz',
        body: 'laudantium enim quasi est quidem magnam',
      };

      const entity = mapCommentDTOtoComment(dto);

      expect(entity).toEqual({
        id: 42,
        postId: 10,
        name: 'id labore ex et quam laborum',
        email: 'Eliseo@gardner.biz',
        body: 'laudantium enim quasi est quidem magnam',
      });
    });
  });

  describe('groupCommentCountByPostId', () => {
    it('aggregates comment counts accurately by postId in O(N)', () => {
      const comments: CommentDTO[] = [
        { id: 1, postId: 1, name: 'a', email: 'a@test.com', body: 'body 1' },
        { id: 2, postId: 1, name: 'b', email: 'b@test.com', body: 'body 2' },
        { id: 3, postId: 2, name: 'c', email: 'c@test.com', body: 'body 3' },
        { id: 4, postId: 1, name: 'd', email: 'd@test.com', body: 'body 4' },
      ];

      const counts = groupCommentCountByPostId(comments);

      expect(counts).toEqual({
        1: 3,
        2: 1,
      });
      expect(counts[999]).toBeUndefined();
    });

    it('returns an empty object when comments list is empty', () => {
      const counts = groupCommentCountByPostId([]);
      expect(counts).toEqual({});
    });
  });
});
