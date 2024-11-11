// src/app/api/articles/fetchArticleDetail.ts

import axios from 'axios';

import { ArticleDetail, ArticleDetailAPI } from '@/app/types/articleDetail';

/**
 * imageUrl 문자열을 배열로 변환하는 함수
 * 예: "[url1, url2, url3]" -> ["url1", "url2", "url3"]
 */
const parseImageUrl = (imageUrl: string): string[] => {
  // 대괄호 제거
  const trimmed = imageUrl.slice(1, -1);
  // 쉼표로 분리하고 공백 제거
  const urls = trimmed.split(',').map((url) => url.trim());
  return urls;
};

export const fetchArticleDetail = async (
  permalink: string
): Promise<ArticleDetail | null> => {
  try {
    const response = await axios.get<{ data: ArticleDetailAPI }>(
      `${process.env.NEXT_PUBLIC_ADMIN_API_URL}/article/detail/${permalink}`
    );
    const data = response.data.data;
    const processedData: ArticleDetail = {
      ...data,
      imageUrl: parseImageUrl(data.imageUrl), // 문자열을 배열로 변환
    };
    return processedData;
  } catch (error) {
    console.error('Failed to fetch article detail:', error);
    return null;
  }
};
