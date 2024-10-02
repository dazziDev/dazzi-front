import { Article } from '@/store/useArticlesStore';

export const fetchArticles = async (): Promise<Article[]> => {
  const res = await fetch('/api/v1/article/list');
  if (!res.ok) {
    throw new Error('Failed to fetch articles');
  }
  const responseData = await res.json();
  return responseData.data;
};
