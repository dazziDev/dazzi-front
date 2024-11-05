import axios from 'axios';

import { ArticleCategory } from '@/app/types/article';

export const fetchArticles = async (): Promise<ArticleCategory[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/article/list`
    );
    console.log('article/list', response);
    const rawData = response.data.data;

    const categories: ArticleCategory[] = Object.keys(rawData).map(
      (categoryName) => ({
        categoryName,
        articles: rawData[categoryName].article,
        categoryId: rawData[categoryName][0]?.categoryId ?? null,
      })
    );

    return categories;
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    throw new Error('Failed to fetch articles');
  }
};
