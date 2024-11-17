import axios from 'axios';

import { Category } from '@/app/types/category';

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get<{ data: Category[] }>(
      'http://localhost/api/v1/web/category/list'
    );
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
};
