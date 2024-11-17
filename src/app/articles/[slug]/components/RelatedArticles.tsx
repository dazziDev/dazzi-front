import Link from 'next/link';
import { useEffect, useState } from 'react';

import { fetchArticles } from '@/app/api/articles/fetchArticles';
import { Article } from '@/app/types/article';

interface RelatedArticlesProps {
  categoryId: number;
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ categoryId }) => {
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  useEffect(() => {
    const getRelatedArticles = async () => {
      const articles = await fetchArticles();
      const related =
        articles
          .find((category) => category.categoryId === categoryId)
          ?.article.slice(0, 4) || [];
      setRelatedArticles(related);
    };
    getRelatedArticles();
  }, [categoryId]);

  return (
    <div className="p-8">
      <h3 className="text-2xl font-bold mb-4">관련 기사</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
