import axiosInstance from '@/app/api/axiosInstance';
import { MainArticle } from '@/app/types/article';

export const fetchMainArticle = async (): Promise<MainArticle[]> => {
  try {
    const response = await axiosInstance.get('/api/v1/web/article/mainList');
    console.log('response', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch main article:', error);
    throw new Error('Failed to fetch main article');
  }
};
