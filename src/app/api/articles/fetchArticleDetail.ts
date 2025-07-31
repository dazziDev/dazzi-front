import axiosInstance from '@/app/api/axiosInstance';
import { ArticleDetail, ArticleDetailAPI } from '@/app/types/articleDetail';

// 백엔드에서 이미 ttps:// 문제를 수정하므로 추가 처리 불필요

export const fetchArticleDetail = async (
  permalink: string
): Promise<ArticleDetail | null> => {
  try {
    const response = await axiosInstance.get<{ data: ArticleDetailAPI }>(
      `/article/detail/${permalink}`
    );

    const data = response.data.data;

    // 백엔드에서 이미 모든 URL 수정이 완료되므로 그대로 사용
    const processedData: ArticleDetail = {
      ...data,
    };

    return processedData;
  } catch (error) {
    console.error('❌ Failed to fetch article detail:', error);
    return null;
  }
};
