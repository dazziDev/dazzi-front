import { create } from 'zustand';

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
