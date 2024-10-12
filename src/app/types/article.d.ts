export interface MainArticle {
  title: string; // 타이틀
  subtitle: string; // 서브타이틀
  updateAt: Date; // 업데이트 일자
  isPublish: boolean; // 공개 플래그
  imageUrl: string; // 메인이미지URL
  permalink: string; // 퍼머링크
}

export interface Article {
  title: string; // 타이틀
  subtitle: string; // 서브타이틀
  updateAt: Date; // 업데이트 일자
  isPublish: boolean; // 공개 플래그
  imageUrl: string; // 메인이미지URL
  permalink: string; // 퍼머링크
  categoryId: number; // 카테고리ID
  editorName: string; // 에디터 이름
}

export interface Category {
  categoryId: number; // 카테고리ID
  categoryName: string; // 카테고리 이름
  articles: Article[];
}
