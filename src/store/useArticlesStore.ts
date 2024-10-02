import { create } from 'zustand';

export interface Article {
  articleId: number;
  thumbnailUrl: string;
  title: string;
  subtitle: string;
  permalink: string;
  categoryName: string;
  authorName: string;
  // 공개여부 데이터 없음
  visibility?: boolean;
  updatedDate: string;
}
// 위의 카테고리네임이 데이터 상위 배열이름으로될듯

interface ArticlesStore {
  articles: Article[];
  setArticles: (articles: Article[]) => void;
}

export const useArticlesStore = create<ArticlesStore>((set) => ({
  articles: [],
  setArticles: (articles) => set({ articles }),
}));
