import axiosInstance from '@/app/api/axiosInstance';
import { Editor } from '@/app/types/editor';
import { fixObjectImageUrls } from '@/lib/urlUtils';

export const fetchEditors = async (): Promise<Editor[]> => {
  try {
    const response = await axiosInstance.get<{ data: Editor[] }>(
      '/editor/list'
    );

    // 모든 에디터의 이미지 URL 수정
    const fixedEditors = response.data.data.map((editor) =>
      fixObjectImageUrls(editor, ['articleImage', 'introduceImage'])
    );

    return fixedEditors;
  } catch (error) {
    console.error('작성자 목록 가져오기 실패:', error);
    return [];
  }
};
