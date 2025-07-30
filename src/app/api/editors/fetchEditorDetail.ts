import axiosInstance from '@/app/api/axiosInstance';
import { Editor } from '@/app/types/editor';
import { fixObjectImageUrls } from '@/lib/urlUtils';

export const fetchEditorDetail = async (editorId: string): Promise<Editor> => {
  try {
    // 캐시 방지를 위한 타임스탬프 추가
    const timestamp = new Date().getTime();
    const response = await axiosInstance.get<Editor>(
      `/editor/${editorId}?_t=${timestamp}`
    );

    // 에디터의 이미지 URL 수정
    const fixedEditor = fixObjectImageUrls(response.data, ['articleImage', 'introduceImage']);
    
    return fixedEditor;
  } catch (error) {
    console.error('❌ 작성자 상세 정보 가져오기 실패:', error);
    throw error;
  }
};
