import { create } from 'zustand';

export interface Author {
  id: number;
  name: string;
  src: string;
  rectSrc: string;
  introduction: string;
}

interface AuthorStore {
  authors: Author[];
  setAuthors: (authors: Author[]) => void;
}

export const useAuthorStore = create<AuthorStore>((set) => ({
  authors: [],
  setAuthors: (authors) => set({ authors }),
}));
