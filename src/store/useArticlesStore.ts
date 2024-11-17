import { create } from 'zustand';

import { ArticleCategory } from '@/app/types/article';

interface ArticlesStore {
  /// 카테고리별로 나누어진 기사들
  articlesByCategory: ArticleCategory[];
  setArticlesByCategory: (categories: ArticleCategory[]) => void;
}

export const useArticlesStore = create<ArticlesStore>((set) => ({
  articlesByCategory: [],
  setArticlesByCategory: (categories) =>
    set({ articlesByCategory: categories }),
}));
