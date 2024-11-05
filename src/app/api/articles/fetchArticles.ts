import axios from 'axios';

import { ArticleCategory } from '@/app/types/article';

export const fetchArticles = async (): Promise<ArticleCategory[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/article/list`
    );
    console.log('article/list', response);
    const rawData = response.data.data;

    /// rawData에서 카테고리별로 데이터를 변환
    const categories: ArticleCategory[] = Object.keys(rawData).map(
      (categoryName) => ({
        categoryName,
        articles: rawData[categoryName].article,
        /// 각 카테고리 내 첫 기사에서 카테고리 ID를 추출
        /// 쓸곳이 있을지는 모르겠지만, 일단 넣어둠
        categoryId: rawData[categoryName][0]?.categoryId ?? null,
      })
    );

    return categories;
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    throw new Error('Failed to fetch articles');
  }
};
