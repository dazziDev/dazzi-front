export interface MainArticle {
  title: string; // 타이틀
  subtitle: string; // 서브타이틀
  updateAt: Date; // 업데이트 일자
  isPublish: boolean; // 공개 플래그
  imageUrl: string; // 메인이미지URL
  landscapeImageUrl?: string; // 가로형 썸네일 URL (PC용)
  portraitImageUrl?: string; // 세로형 썸네일 URL (모바일용)
  permalink: string; // 퍼머링크
}

export interface Article {
  id?: number; // 기사 ID
  title: string; // 타이틀
  subtitle: string; // 서브타이틀
  updateAt: Date; // 업데이트 일자
  publishTime: Date; // 발행 시간
  isPublish: boolean; // 공개 플래그
  imageUrl: string; // 메인이미지URL
  landscapeImageUrl?: string; // 가로형 썸네일 URL (PC용)
  portraitImageUrl?: string; // 세로형 썸네일 URL (모바일용)
  permalink: string; // 퍼머링크
  categoryId: number; // 카테고리ID
  editorId: string; // 에디터 ID
  editorName: string; // 에디터 이름
  category?: {
    categoryId: number;
    categoryName: string;
  };
  editor?: {
    editorId: string;
    editorName: string;
  };
}

export interface ArticleCategory {
  categoryId: number; // 카테고리ID
  categoryName: string; // 카테고리 이름
  permalink: string; // 퍼머링크
  article: Article[];
}
