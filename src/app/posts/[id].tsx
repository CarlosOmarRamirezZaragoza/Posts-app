/**
 * Developer: CORZ (https://www.linkedin.com/in/omar-ramirez-6a51b7141/)
 * Date: 2026-10-12
 * Description: Post detail route — thin route adapter extracting route params and rendering PostDetailScreen.
 */

import { useLocalSearchParams } from 'expo-router';

import { PostDetailScreen } from '@/modules/posts/presentation/screens/PostDetailScreen';

export default function PostDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const postId = Number(id);

  return <PostDetailScreen postId={postId} />;
}
