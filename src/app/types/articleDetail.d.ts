export interface ArticleDetailAPI {
  id: number;
  title: string;
  subtitle: string;
  text: string;
  updateAt: string;
  isPublish: boolean;
  // API 응답은 문자열로 반환됨
  imageUrl: string;
  landscapeImageUrl?: string; // 가로형 썸네일 URL (PC용)
  portraitImageUrl?: string; // 세로형 썸네일 URL (모바일용)
  permalink: string;
  categoryId: number;
  editorId: string;
  editorName: string;
}

export interface ArticleDetail {
  id: number;
  title: string;
  subtitle: string;
  text: string;
  updateAt: string;
  isPublish: boolean;
  // 클라이언트에서는 배열로 사용
  imageUrl: string[];
  landscapeImageUrl?: string; // 가로형 썸네일 URL (PC용)
  portraitImageUrl?: string; // 세로형 썸네일 URL (모바일용)
  permalink: string;
  categoryId: number;
  editorId: string;
  editorName: string;
}
