import axios from 'axios';

import { MainArticle } from '@/app/types/article';

export const fetchMainArticle = async (): Promise<MainArticle[]> => {
  try {
    const response = await axios.get('/api/v1/article/main');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch main article:', error);
    throw new Error('Failed to fetch main article');
  }
};
