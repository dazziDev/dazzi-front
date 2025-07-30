import axiosInstance from '@/app/api/axiosInstance';
import { ArticleDetail, ArticleDetailAPI } from '@/app/types/articleDetail';

/**
 * imageUrl 문자열을 배열로 변환하는 함수
 * 예: "[url1, url2, url3]" -> ["url1", "url2", "url3"]
 */
const parseImageUrl = (imageUrl: string): string[] => {
  // 대괄호 제거
  const trimmed = imageUrl.slice(1, -1);
  // 쉼표로 분리하고 공백 및 따옴표 제거
  const urls = trimmed.split(',').map((url) => {
    let cleanUrl = url.trim().replace(/['"]/g, '');
    // https가 ttps로 잘못 파싱된 경우 수정
    if (cleanUrl.startsWith('ttps://')) {
      cleanUrl = 'h' + cleanUrl;
    }
    return cleanUrl;
  });
  return urls;
};

export const fetchArticleDetail = async (
  permalink: string
): Promise<ArticleDetail | null> => {
  try {
    const response = await axiosInstance.get<{ data: ArticleDetailAPI }>(
      `/article/detail/${permalink}`
    );

    const data = response.data.data;

    const processedData: ArticleDetail = {
      ...data,
      imageUrl: parseImageUrl(data.imageUrl), // 문자열을 배열로 변환
      // landscapeImageUrl, portraitImageUrl도 ttps 수정
      landscapeImageUrl: data.landscapeImageUrl
        ? data.landscapeImageUrl.startsWith('ttps://')
          ? 'h' + data.landscapeImageUrl
          : data.landscapeImageUrl
        : undefined,
      portraitImageUrl: data.portraitImageUrl
        ? data.portraitImageUrl.startsWith('ttps://')
          ? 'h' + data.portraitImageUrl
          : data.portraitImageUrl
        : undefined,
    };

    return processedData;
  } catch (error) {
    console.error('❌ Failed to fetch article detail:', error);
    return null;
  }
};
