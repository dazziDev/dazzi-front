import { create } from 'zustand';

import { MainArticle } from '@/app/types/article';

interface MainArticleStore {
  mainArticles: MainArticle[];
  setMainArticles: (articles: MainArticle[]) => void;
}

export const useMainArticleStore = create<MainArticleStore>((set) => ({
  mainArticles: [],
  setMainArticles: (articles) => set({ mainArticles: articles }),
}));
