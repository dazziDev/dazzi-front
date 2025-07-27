import { Article, MainArticle } from '@/app/types/article';

/**
 * PC/모바일에 따라 적절한 이미지 URL을 반환하는 유틸리티
 * @param article 기사 데이터
 * @param isMobile 모바일 여부 (기본값: false)
 * @returns 적절한 이미지 URL
 */
export const getResponsiveImageUrl = (
  article: Article | MainArticle,
  isMobile: boolean = false
): string => {
  // 듀얼 썸네일 데이터가 있는지 확인
  const hasLandscape =
    article.landscapeImageUrl && article.landscapeImageUrl.trim() !== '';
  const hasPortrait =
    article.portraitImageUrl && article.portraitImageUrl.trim() !== '';

  // 모바일인 경우 세로형 이미지 우선
  if (isMobile && hasPortrait && article.portraitImageUrl) {
    return article.portraitImageUrl;
  }

  // PC인 경우 가로형 이미지 우선
  if (!isMobile && hasLandscape && article.landscapeImageUrl) {
    return article.landscapeImageUrl;
  }

  // 듀얼 썸네일이 없으면 기본 이미지 사용
  return article.imageUrl;
};

// getImageAspectRatio 함수 제거: ResponsiveImage에서 CSS aspectRatio를 직접 사용하므로 불필요
