export interface ArticleDetailAPI {
  id: number;
  title: string;
  subtitle: string;
  text: string;
  updateAt: string;
  isPublish: boolean;
  // API 응답은 문자열로 반환됨
  imageUrl: string;
  permalink: string;
  categoryId: number;
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
  permalink: string;
  categoryId: number;
  editorName: string;
}
