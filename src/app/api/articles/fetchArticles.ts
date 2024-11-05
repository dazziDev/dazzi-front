import axios from 'axios';

import { ArticleCategory } from '@/app/types/article';

export const fetchArticles = async (): Promise<ArticleCategory[]> => {
  try {
    const response = await axios.get<{
      data: ArticleCategory[];
    }>(`${process.env.NEXT_PUBLIC_API_URL}/article/list`);
    console.log('article/list', response);
    const rawData = response.data;

    const categories: ArticleCategory[] = rawData.data.map((category) => ({
      categoryName: category.categoryName,
      article: category.article,
      categoryId: category.categoryId,
    }));

    return categories;
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    throw new Error('Failed to fetch articles');
  }
};
