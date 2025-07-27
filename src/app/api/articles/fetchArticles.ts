import axiosInstance from '@/app/api/axiosInstance';
import { ArticleCategory } from '@/app/types/article';

import { fetchCategories } from '../categories/fetchCategories';

export const fetchArticles = async (): Promise<ArticleCategory[]> => {
  try {
    // 병렬로 기사 목록과 카테고리 정보를 가져오기
    const [articlesResponse, categoriesInfo] = await Promise.all([
      axiosInstance.get<{ data: ArticleCategory[] }>('/article/list'),
      fetchCategories(),
    ]);

    if (!articlesResponse.data || !articlesResponse.data.data) {
      console.error(
        '❌ 응답 데이터 구조가 예상과 다름:',
        articlesResponse.data
      );
      return [];
    }

    // data 배열에서 ArticleCategory 객체들로 변환하면서 카테고리 정보 병합
    const categories = articlesResponse.data.data.map((category) => {
      // categoryId로 해당 카테고리 정보 찾기
      const categoryInfo = categoriesInfo.find(
        (cat) => cat.categoryId === category.categoryId
      );

      return {
        categoryName: category.categoryName,
        permalink: categoryInfo?.permalink || `category-${category.categoryId}`, // fallback으로 categoryId 사용
        article: category.article,
        categoryId: category.categoryId,
      };
    });

    categories.forEach((cat, index) => {
      if (cat.article && cat.article.length > 0) {
        cat.article.forEach((article, articleIndex) => {
          console.log(`  📄 기사 ${articleIndex + 1}: ${article.title}`);
        });
      }
    });

    return categories;
  } catch (error) {
    console.error('❌ Failed to fetch articles:', error);
    if (error instanceof Error && 'response' in error) {
      const axiosError = error as any;
      console.error('❌ Error response:', axiosError.response?.data);
      console.error('❌ Error status:', axiosError.response?.status);
    }
    throw new Error('Failed to fetch articles');
  }
};
