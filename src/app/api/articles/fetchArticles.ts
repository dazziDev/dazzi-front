import axios from 'axios';

import { ArticleCategory } from '@/app/types/article';

export const fetchArticles = async (): Promise<ArticleCategory[]> => {
  try {
    const response = await axios.get<{ data: ArticleCategory[] }>(
      `${process.env.NEXT_PUBLIC_API_URL}/article/list`
    );
    console.log('API response:', response.data); // 확인용 로그

    // data 배열에서 ArticleCategory 객체들로 변환
    const categories = response.data.data.map((category) => ({
      categoryName: category.categoryName,
      article: category.article, // articles 속성 사용
      categoryId: category.categoryId,
    }));

    console.log('Transformed categories:', categories); // 확인용 로그
    return categories;
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    throw new Error('Failed to fetch articles');
  }
};
