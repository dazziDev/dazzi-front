import { create } from 'zustand';

// 이쪽 카테고리 아님, 전체 불러올지, 카테고리별로 여러개 불러올지 상담해야함
// 이쪽 카테고리 아님, 전체 불러올지, 카테고리별로 여러개 불러올지 상담해야함
// 이쪽 카테고리 아님, 전체 불러올지, 카테고리별로 여러개 불러올지 상담해야함
// 이쪽 카테고리 아님, 전체 불러올지, 카테고리별로 여러개 불러올지 상담해야함
// 이쪽 카테고리 아님, 전체 불러올지, 카테고리별로 여러개 불러올지 상담해야함
export interface Categories {
  main: {
    title: string;
    subtitle: string;
    image: string;
  };
  categories: {
    category: string;
    subtitle: string;
    articles: {
      title: string;
      subtitle: string;
      date: string;
      image: string;
    }[];
  }[];
}

interface HomeCategoriesStore {
  categories: Categories[];
  setCategories: (categories: Categories[]) => void;
}

export const useHomeCategoriesStore = create<HomeCategoriesStore>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),
}));
