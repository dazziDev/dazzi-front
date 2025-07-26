'use client';
import { useEffect } from 'react';

import { fetchArticles } from '@/app/api/articles/fetchArticles';
import { CategorySectionSkeleton } from '@/components/ui/ArticleCardSkeleton';
import { useArticlesStore } from '@/store/useArticlesStore';

import CategorySection from './CategorySection';

const ArticleList = () => {
  const { articlesByCategory, setArticlesByCategory } = useArticlesStore();

  useEffect(() => {
    const getArticles = async () => {
      try {
        const data = await fetchArticles();
        setArticlesByCategory(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    getArticles();
  }, [setArticlesByCategory]);

  // 로딩 중에는 스켈레톤을 표시
  if (!articlesByCategory.length) {
    return (
      <div className="space-y-16">
        {[...Array(3)].map((_, index) => (
          <CategorySectionSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {articlesByCategory.map((category, index) => (
        <CategorySection key={index} category={category} />
      ))}
    </div>
  );
};

export default ArticleList;
