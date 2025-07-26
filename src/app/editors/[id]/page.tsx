'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { fetchArticlesByEditor } from '@/app/api/editors/fetchArticlesByEditor';
import { fetchEditorDetail } from '@/app/api/editors/fetchEditorDetail';
import { Article } from '@/app/types/article';
import { Editor } from '@/app/types/editor';

interface EditorProfileData {
  editor: Editor;
  articles: Article[];
}

const EditorProfilePage = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState<EditorProfileData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfileData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const [editorDetail, articlesData] = await Promise.all([
          fetchEditorDetail(id as string),
          fetchArticlesByEditor(id as string),
        ]);

        setProfileData({
          editor: editorDetail,
          articles: articlesData.articles,
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : '데이터를 불러올 수 없습니다'
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* 프로필 헤더 스켈레톤 */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-card rounded-3xl p-12 animate-pulse">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-40 h-40 bg-gray-200 rounded-full" />
                <div className="flex-1 text-center md:text-left space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-48" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>
              </div>
            </div>
          </div>

          {/* 기사 목록 스켈레톤 */}
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-card rounded-2xl p-8 animate-pulse">
                <div className="flex gap-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-xl" />
                  <div className="flex-1 space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-md mx-auto">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">
              프로필을 찾을 수 없습니다
            </h1>
            <p className="text-muted-foreground mb-8">{error}</p>
            <Link
              href="/editors"
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
            >
              다찌 목록으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              프로필을 찾을 수 없습니다
            </h1>
          </div>
        </div>
      </div>
    );
  }

  const { editor, articles } = profileData;

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 프로필 헤더 */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative bg-card border border-border rounded-3xl p-12 overflow-hidden">
            {/* 배경 그라데이션 */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />

            {/* 장식 요소 */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full translate-y-12 -translate-x-12" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              {/* 프로필 이미지 */}
              <div className="relative">
                <div className="w-40 h-40 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full" />
                  <Image
                    src={editor.introduceImage || '/default-avatar.png'}
                    alt={editor.editorName}
                    width={160}
                    height={160}
                    className="w-full h-full object-cover rounded-full border-4 border-background shadow-2xl relative z-10"
                    unoptimized
                  />
                </div>
                {/* 상태 표시 */}
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-background rounded-full" />
              </div>

              {/* 프로필 정보 */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
                  {editor.editorName}
                </h1>

                {editor.description && (
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-2xl">
                    {editor.description}
                  </p>
                )}

                {/* 통계 */}
                <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {articles.length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      발행된 기사
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {
                        new Set(articles.map((article) => article.categoryId))
                          .size
                      }
                    </div>
                    <div className="text-sm text-muted-foreground">
                      카테고리
                    </div>
                  </div>
                </div>

                {/* 소셜 링크 (향후 확장용) */}
                <div className="flex justify-center md:justify-start gap-3">
                  <button className="p-3 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full transition-all duration-300">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </button>
                  <button className="p-3 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full transition-all duration-300">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 기사 목록 */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">발행한 기사</h2>
            <div className="text-sm text-muted-foreground">
              총 {articles.length}개의 기사
            </div>
          </div>

          {articles.length > 0 ? (
            <div className="space-y-6">
              {articles
                .sort(
                  (a, b) =>
                    new Date(b.updateAt).getTime() -
                    new Date(a.updateAt).getTime()
                )
                .map((article, index) => (
                  <Link
                    key={article.id || index}
                    href={`/articles/${article.permalink}`}
                    className="group"
                  >
                    <article className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                      <div className="flex gap-6">
                        {/* 기사 이미지 */}
                        <div className="w-24 h-24 bg-muted rounded-xl overflow-hidden flex-shrink-0">
                          {article.imageUrl && (
                            <Image
                              src={article.imageUrl}
                              alt={article.title}
                              width={96}
                              height={96}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              unoptimized
                            />
                          )}
                        </div>

                        {/* 기사 정보 */}
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-2 line-clamp-2">
                            {article.title}
                          </h3>

                          {article.subtitle && (
                            <p className="text-muted-foreground mb-3 line-clamp-2">
                              {article.subtitle}
                            </p>
                          )}

                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>
                              {new Date(article.updateAt).toLocaleDateString(
                                'ko-KR'
                              )}
                            </span>
                            {article.category && (
                              <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                                {article.category.categoryName}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* 화살표 아이콘 */}
                        <div className="flex items-center">
                          <svg
                            className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-card rounded-2xl border border-border">
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
                아직 발행한 기사가 없습니다
              </h3>
              <p className="text-muted-foreground">
                첫 번째 기사가 곧 발행될 예정입니다.
              </p>
            </div>
          )}
        </div>

        {/* 뒤로 가기 버튼 */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <Link
            href="/editors"
            className="inline-flex items-center px-6 py-3 text-muted-foreground hover:text-foreground border border-border hover:border-primary rounded-full transition-all duration-300"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            다찌 목록으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditorProfilePage;
