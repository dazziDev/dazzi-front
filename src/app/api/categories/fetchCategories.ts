import axiosInstance from '@/app/api/axiosInstance';
import { Category } from '@/app/types/category';

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await axiosInstance.get<{ data: Category[] }>(
      'category/list'
    );
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
};
