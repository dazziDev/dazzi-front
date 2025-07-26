import { Article } from '@/app/types/article';

import { fetchCategories } from '../categories/fetchCategories';
import { fetchArticles } from './fetchArticles';

export const fetchArticlesByCategory = async (
  categoryPermalink: string
): Promise<{
  categoryName: string;
  articles: Article[];
}> => {
  try {
    // URL 디코딩 처리
    const decodedPermalink = decodeURIComponent(categoryPermalink);

    // 카테고리 정보를 가져오기
    const allCategoriesInfo = await fetchCategories();

    // permalink로 카테고리 찾기
    const targetCategoryInfo = allCategoriesInfo.find((category) => {
      // permalink로 정확히 매칭
      return (
        category.permalink === decodedPermalink ||
        category.categoryName === decodedPermalink
      );
    });

    if (!targetCategoryInfo) {
      console.error('카테고리를 찾을 수 없습니다:', decodedPermalink);
      console.error(
        '사용 가능한 카테고리:',
        allCategoriesInfo.map((c) => ({
          id: c.categoryId,
          name: c.categoryName,
          permalink: c.permalink,
        }))
      );
      throw new Error(`카테고리를 찾을 수 없습니다: ${decodedPermalink}`);
    }

    // 해당 카테고리의 기사들을 가져오기
    const allArticleCategories = await fetchArticles();
    const targetArticleCategory = allArticleCategories.find(
      (category) => category.categoryId === targetCategoryInfo.categoryId
    );

    return {
      categoryName: targetCategoryInfo.categoryName,
      articles: targetArticleCategory?.article || [],
    };
  } catch (error) {
    console.error('카테고리 기사 가져오기 오류:', error);
    throw error;
  }
};
