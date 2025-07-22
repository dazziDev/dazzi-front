import axiosInstance from '@/app/api/axiosInstance';
import { ArticleCategory } from '@/app/types/article';

export const fetchArticles = async (): Promise<ArticleCategory[]> => {
  try {
    console.log('🚀 API 호출 시작: /article/list');
    console.log('🔗 Base URL:', process.env.NEXT_PUBLIC_API_URL);

    const response = await axiosInstance.get<{ data: ArticleCategory[] }>(
      '/article/list'
    );

    console.log('✅ API response 전체:', response);
    console.log('📦 response.data:', response.data);
    console.log('📊 response.status:', response.status);

    if (!response.data || !response.data.data) {
      console.error('❌ 응답 데이터 구조가 예상과 다름:', response.data);
      return [];
    }

    console.log('📋 Raw categories data:', response.data.data);

    // data 배열에서 ArticleCategory 객체들로 변환
    const categories = response.data.data.map((category) => ({
      categoryName: category.categoryName,
      article: category.article, // articles 속성 사용
      categoryId: category.categoryId,
    }));

    console.log('🔄 Transformed categories:', categories);
    console.log('📝 총 카테고리 수:', categories.length);

    categories.forEach((cat, index) => {
      console.log(
        `📂 카테고리 ${index + 1}: ${cat.categoryName} (${cat.article?.length || 0}개 기사)`
      );
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
