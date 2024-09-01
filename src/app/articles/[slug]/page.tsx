import ArticleContent from '@/app/articles/[slug]/components/ArticleContent';
import CommentSection from '@/app/articles/[slug]/components/CommentSection';
import RelatedArticles from '@/app/articles/[slug]/components/RelatedArticles';
import ShareButtons from '@/app/articles/[slug]/components/ShareButtons';

const ArticlePage = () => {
  return (
    <div>
      <ArticleContent />
      <RelatedArticles />
      <CommentSection />
      <ShareButtons />
    </div>
  );
};

export default ArticlePage;
