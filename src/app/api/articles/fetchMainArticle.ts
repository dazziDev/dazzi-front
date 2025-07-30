import axiosInstance from '@/app/api/axiosInstance';
import { MainArticle } from '@/app/types/article';
import { fixObjectImageUrls } from '@/lib/urlUtils';

export const fetchMainArticle = async (): Promise<MainArticle[]> => {
  try {
    const response = await axiosInstance.get('/article/mainList');
    console.log('response', response.data);
    
    // 모든 메인 기사의 이미지 URL 수정
    const fixedArticles = response.data.data.map((article: MainArticle) => 
      fixObjectImageUrls(article, ['imageUrl', 'landscapeImageUrl', 'portraitImageUrl'])
    );
    
    return fixedArticles;
  } catch (error) {
    console.error('Failed to fetch main article:', error);
    throw new Error('Failed to fetch main article');
  }
};
