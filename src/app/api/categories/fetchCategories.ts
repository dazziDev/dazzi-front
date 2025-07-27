import axiosInstance from '@/app/api/axiosInstance';
import { Category } from '@/app/types/category';

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await axiosInstance.get('/category/list');

    let categories: Category[] = [];

    // API 응답 구조 확인
    if (response.data && response.data.data) {
      categories = response.data.data;
    } else if (Array.isArray(response.data)) {
      categories = response.data;
    } else {
      console.error('예상치 못한 API 응답 구조:', response.data);
      return [];
    }

    // 각 카테고리의 permalink 값 검증 및 로그
    categories.forEach((category, index) => {
      // permalink가 없는 경우 경고
      if (!category.permalink) {
        console.warn(
          `⚠️ 카테고리 "${category.categoryName}"의 permalink가 누락됨`
        );
      }
    });

    return categories;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
};
