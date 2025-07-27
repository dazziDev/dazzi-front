'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { fetchEditors } from '@/app/api/editors/fetchEditors';
import { Editor } from '@/app/types/editor';

const EditorsPage = () => {
  const [editors, setEditors] = useState<Editor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEditors = async () => {
      try {
        setLoading(true);
        const data = await fetchEditors();
        setEditors(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : '데이터를 불러올 수 없습니다'
        );
      } finally {
        setLoading(false);
      }
    };

    loadEditors();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-200 rounded-lg w-96 mx-auto mb-4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-64 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card rounded-2xl p-8 animate-pulse">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6" />
                <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-3" />
                <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto" />
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
          <div className="text-center">
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
              오류가 발생했습니다
            </h1>
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 헤더 섹션 */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6 tracking-tight">
            다찌들
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            일본에서 살아가는 한국인들이 전하는 생생한 일본 이야기
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-32 h-1 bg-gradient-to-r from-primary/30 via-primary to-primary/30 rounded-full" />
          </div>
        </div>

        {/* 작성자 그리드 */}
        {editors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {editors.map((editor) => (
              <Link
                key={editor.editorId}
                href={`/editors/${editor.editorId}`}
                className="group block"
              >
                <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
                  {/* 사각형 이미지 */}
                  <div className="aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={editor.introduceImage || '/default-avatar.png'}
                      alt={editor.editorName}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                      onError={(e) => {
                        e.currentTarget.src = '/default-avatar.png';
                      }}
                    />
                  </div>

                  {/* 콘텐츠 */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors mb-3">
                      {editor.editorName}
                    </h3>

                    {editor.description && (
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3 mb-4">
                        {editor.description}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-8">
              <svg
                className="w-12 h-12 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              아직 다찌가 없습니다
            </h3>
            <p className="text-muted-foreground">
              곧 다양한 다찌들의 프로필을 만나보실 수 있어요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorsPage;
