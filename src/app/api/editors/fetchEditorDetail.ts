import axiosInstance from '@/app/api/axiosInstance';
import { Editor } from '@/app/types/editor';

export const fetchEditorDetail = async (editorId: string): Promise<Editor> => {
  try {
    const response = await axiosInstance.get<Editor>(
      `/api/v1/web/editor/${editorId}`
    );
    return response.data;
  } catch (error) {
    console.error('작성자 상세 정보 가져오기 실패:', error);
    throw error;
  }
};
