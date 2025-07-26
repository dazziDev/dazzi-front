import axiosInstance from '@/app/api/axiosInstance';
import { Editor } from '@/app/types/editor';

export const fetchEditors = async (): Promise<Editor[]> => {
  try {
    const response = await axiosInstance.get<{ data: Editor[] }>(
      '/editor/list'
    );
    return response.data.data;
  } catch (error) {
    console.error('작성자 목록 가져오기 실패:', error);
    return [];
  }
};
