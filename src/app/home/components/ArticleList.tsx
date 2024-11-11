'use client';
import { useEffect } from 'react';

import { fetchArticles } from '@/app/api/articles/fetchArticles';
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

  return (
    <div className="container mx-auto py-8 relative sm:px-4">
      {articlesByCategory.map((category, index) => (
        <CategorySection key={index} category={category} />
      ))}
    </div>
  );
};

export default ArticleList;
