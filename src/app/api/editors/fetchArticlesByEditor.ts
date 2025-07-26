import { Article } from '@/app/types/article';

import { fetchArticles } from '../articles/fetchArticles';

export const fetchArticlesByEditor = async (
  editorId: string
): Promise<{
  editorName: string;
  articles: Article[];
}> => {
  try {
    console.log('작성자 기사 검색 시작:', editorId);

    // 전체 기사를 가져와서 해당 작성자의 기사만 필터링
    const allCategories = await fetchArticles();
    console.log('전체 카테고리 목록:', allCategories);

    let editorName = '';
    let editorArticles: Article[] = [];

    // 먼저 editorId로 작성자 정보를 가져와서 editorName을 찾기
    const { fetchEditorDetail } = await import('./fetchEditorDetail');
    try {
      const editorDetail = await fetchEditorDetail(editorId);
      editorName = editorDetail.editorName;
    } catch (error) {
      console.error('작성자 정보 가져오기 실패:', error);
      return {
        editorName: '알 수 없는 작성자',
        articles: [],
      };
    }

    // 모든 카테고리에서 해당 작성자의 기사 찾기 (editorName으로 매칭)
    allCategories.forEach((category) => {
      if (category.article) {
        const authorArticles = category.article.filter(
          (article) => article.editorName === editorName
        );

        if (authorArticles.length > 0) {
          editorArticles = [...editorArticles, ...authorArticles];
        }
      }
    });

    console.log('찾은 작성자 기사들:', editorArticles);

    return {
      editorName: editorName,
      articles: editorArticles,
    };
  } catch (error) {
    console.error('작성자 기사 가져오기 오류:', error);
    throw error;
  }
};
