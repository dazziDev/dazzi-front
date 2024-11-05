import axios from 'axios';

import { MainArticle } from '@/app/types/article';

export const fetchMainArticle = async (): Promise<MainArticle[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/article/mainList`
    );
    console.log('response', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch main article:', error);
    throw new Error('Failed to fetch main article');
  }
};
