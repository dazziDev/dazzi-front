import { Categories } from '@/store/useHomeCategoriesStore';

// 더미 api 호출
export const fetchCategories = async (): Promise<Categories[]> => {
  const res = await fetch('/api/categories');
  if (!res.ok) {
    throw new Error('Failed to fetch authors');
  }
  return res.json();
};
