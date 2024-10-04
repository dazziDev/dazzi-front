import axios from 'axios';

import { Category } from '@/app/types/article';

export const fetchArticles = async (): Promise<Category[]> => {
  try {
    const response = await axios.get('/api/v1/article/list');
    const rawData = response.data.data;

    /// rawData에서 카테고리별로 데이터를 변환
    const categories: Category[] = Object.keys(rawData).map((categoryName) => ({
      categoryName,
      articles: rawData[categoryName],
      /// 각 카테고리 내 첫 기사에서 카테고리 ID를 추출
      /// 쓸곳이 있을지는 모르겠지만, 일단 넣어둠
      categoryId: rawData[categoryName][0].categoryId,
    }));

    return categories;
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    throw new Error('Failed to fetch articles');
  }
};
