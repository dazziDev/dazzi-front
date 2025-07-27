import Link from 'next/link';
import { useEffect, useState } from 'react';

import { fetchArticles } from '@/app/api/articles/fetchArticles';
import { Article } from '@/app/types/article';

interface RelatedArticlesProps {
  categoryId: number;
  currentArticlePermalink: string;
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({
  categoryId,
  currentArticlePermalink,
}) => {
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  useEffect(() => {
    const getRelatedArticles = async () => {
      const articles = await fetchArticles();
      const related =
        articles
          .find((category) => category.categoryId === categoryId)
          ?.article.filter(
            (article) => article.permalink !== currentArticlePermalink
          )
          .slice(0, 4) || [];
      setRelatedArticles(related);
    };
    getRelatedArticles();
  }, [categoryId, currentArticlePermalink]);

  return (
    <div className="w-full max-w-none px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8">
      <h3 className="text-2xl font-bold mb-6">관련 기사</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {relatedArticles.map((article) => (
          <Link href={`/articles/${article.permalink}`} key={article.permalink}>
            <div className="border rounded p-4 hover:bg-gray-100">
              <h4 className="text-lg font-semibold">{article.title}</h4>
              <p className="text-sm text-gray-500">{article.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;
