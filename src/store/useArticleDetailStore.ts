import { create } from 'zustand';

import { ArticleDetail } from '@/app/types/articleDetail';

interface ArticleDetailState {
  articleDetail: ArticleDetail | null;
  setArticleDetail: (data: ArticleDetail) => void;
}

export const useArticleDetailStore = create<ArticleDetailState>((set) => ({
  articleDetail: null,
  setArticleDetail: (data) => set({ articleDetail: data }),
}));
