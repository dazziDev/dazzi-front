'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { fetchArticlesByCategory } from '@/app/api/articles/fetchArticlesByCategory';
import { Article } from '@/app/types/article';

import ArticleCard from './components/ArticleCard';

interface CategoryPageData {
  categoryName: string;
  articles: Article[];
}

const CategoryPage = () => {
  const params = useParams();
  const [categoryData, setCategoryData] = useState<CategoryPageData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategoryData = async () => {
      if (!params.category) {
        setError('카테고리 파라미터가 없습니다');
        setLoading(false);
        return;
      }

      // params.category가 배열일 수도 있으므로 처리
      const categoryParam = Array.isArray(params.category)
        ? params.category[0]
        : params.category;

      try {
        setLoading(true);
        const data = await fetchArticlesByCategory(categoryParam);
        setCategoryData(data);
      } catch (err) {
        console.error('CategoryPage - 에러:', err);
        setError(
          err instanceof Error ? err.message : '데이터를 불러올 수 없습니다'
        );
      } finally {
        setLoading(false);
      }
    };

    loadCategoryData();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              오류가 발생했습니다
            </h1>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!categoryData) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-600 mb-4">
              카테고리를 찾을 수 없습니다
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 카테고리 헤더 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
            {categoryData.categoryName}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary/50 to-primary mx-auto rounded-full" />
        </div>

        {/* 기사 목록 */}
        {categoryData.articles.length > 0 ? (
          <div className="max-w-4xl mx-auto space-y-8">
            {categoryData.articles
              .sort(
                (a, b) =>
                  new Date(b.updateAt).getTime() -
                  new Date(a.updateAt).getTime()
              )
              .map((article, index) => (
                <div
                  key={article.id || index}
                  className="group bg-card border border-border rounded-xl p-8 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                >
                  <ArticleCard article={article} />
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              아직 기사가 없습니다
            </h3>
            <p className="text-muted-foreground">
              이 카테고리에 첫 번째 기사를 기다리고 있어요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
