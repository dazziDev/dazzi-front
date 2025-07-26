'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import { fetchArticleDetail } from '@/app/api/articles/fetchArticleDetail';
import ArticlePageSkeleton from '@/components/ui/ArticlePageSkeleton';
import { useArticleDetailStore } from '@/store/useArticleDetailStore';

import ArticleContent from './components/ArticleContent';
import CommentSection from './components/CommentSection';
import RelatedArticles from './components/RelatedArticles';

const ArticlePage = () => {
  const { slug } = useParams();
  const { articleDetail, setArticleDetail } = useArticleDetailStore();

  useEffect(() => {
    if (slug) {
      const getArticleDetail = async () => {
        const data = await fetchArticleDetail(slug as string);
        if (data) {
          setArticleDetail(data);
        }
      };
      getArticleDetail();
    }
  }, [slug, setArticleDetail]);

  if (!articleDetail) return <ArticlePageSkeleton />;

  return (
    <div className="mt-14">
      <ArticleContent />
      <RelatedArticles
        categoryId={articleDetail.categoryId}
        currentArticlePermalink={articleDetail.permalink}
      />
      <CommentSection articleId={articleDetail.id} />
    </div>
  );
};

export default ArticlePage;
