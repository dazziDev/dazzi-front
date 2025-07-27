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

                {/* SNS 링크 */}
                <div className="flex justify-center md:justify-start gap-3">
                  {editor.instagramUrl && (
                    <a
                      href={editor.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-muted rounded-full transition-all duration-300"
                      title="Instagram"
                    >
                      <svg
                        className="w-5 h-5 text-pink-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  )}

                  {editor.youtubeUrl && (
                    <a
                      href={editor.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-muted rounded-full transition-all duration-300"
                      title="YouTube"
                    >
                      <svg
                        className="w-5 h-5 text-red-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                  )}

                  {editor.xUrl && (
                    <a
                      href={editor.xUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-muted rounded-full transition-all duration-300"
                      title="X (구 Twitter)"
                    >
                      <svg
                        className="w-5 h-5 text-black"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  )}

                  {editor.linkedinUrl && (
                    <a
                      href={editor.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-muted rounded-full transition-all duration-300"
                      title="LinkedIn"
                    >
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  )}

                  {editor.websiteUrl && (
                    <a
                      href={editor.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-muted rounded-full transition-all duration-300"
                      title="웹사이트"
                    >
                      <svg
                        className="w-5 h-5 text-gray-700"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169-.003-.334-.01-.503-.01-.468-1.05-1.169-1.968-2.022-2.682-.253-.212-.513-.403-.787-.57-.239-.145-.491-.259-.748-.354-.216-.08-.435-.147-.658-.198-.19-.044-.38-.076-.572-.097-.405-.044-.815-.06-1.228-.047-.476.014-.946.054-1.408.12-.295.043-.585.102-.869.18-.22.062-.437.134-.649.218-.238.093-.471.201-.695.323-.19.104-.373.22-.549.346-.688.494-1.289 1.12-1.773 1.85-.301.456-.562.949-.768 1.472h2.422c.654 0 1.283.124 1.857.35.54.213 1.027.523 1.433.914.371.357.675.781.897 1.252.185.392.308.812.364 1.246.047.362.036.728-.033 1.085-.073.375-.2.738-.375 1.075-.266.512-.636.96-1.084 1.311-.399.312-.857.543-1.346.679-.183.051-.369.088-.556.113-.172.023-.345.035-.518.038H8.55c-.067.131-.122.271-.167.416-.085.273-.134.555-.145.839-.012.303.013.606.076.904.035.166.081.329.138.489.045.128.098.253.159.374.063.125.135.244.214.358.172.248.373.471.599.668.215.186.447.349.692.485.223.124.455.227.694.308.213.072.431.125.652.161.2.033.403.05.607.051.4.002.798-.046 1.188-.143.35-.087.689-.22 1.011-.394.289-.157.561-.347.809-.569.221-.198.423-.419.602-.659.159-.213.3-.439.423-.677.109-.212.202-.432.277-.659.067-.202.119-.408.154-.618.032-.192.049-.387.051-.582.004-.42-.049-.838-.156-1.244-.096-.365-.248-.715-.45-1.036-.180-.287-.396-.55-.642-.781-.219-.205-.456-.384-.708-.537-.226-.137-.462-.251-.706-.342-.209-.078-.424-.138-.641-.181-.188-.037-.378-.061-.569-.073-.167-.010-.335-.009-.502-.003zm-1.108-1.985c-.075-.386-.24-.753-.479-1.078-.213-.289-.48-.536-.784-.725-.27-.168-.567-.29-.877-.36-.275-.062-.557-.075-.836-.038-.248.033-.492.106-.721.215-.203.097-.395.224-.569.375-.154.134-.296.284-.422.448-.112.146-.21.302-.294.467-.074.145-.135.296-.182.452-.042.138-.075.279-.098.422-.021.131-.033.264-.036.397-.004.122-.001.244.008.366.006.084.015.167.027.25H12.46zm8.772 2.127c.086-.149.157-.306.212-.47.049-.147.085-.298.107-.451.019-.135.025-.272.018-.408-.006-.121-.02-.241-.042-.36-.019-.103-.044-.205-.075-.305-.027-.088-.059-.174-.095-.258-.032-.075-.067-.148-.106-.218-.034-.063-.071-.124-.111-.183-.036-.053-.074-.104-.114-.153-.035-.043-.072-.084-.111-.123-.034-.034-.069-.067-.106-.098-.032-.027-.065-.052-.099-.076-.030-.021-.061-.041-.093-.059-.028-.016-.057-.031-.086-.045-.025-.012-.051-.023-.077-.033-.023-.009-.046-.017-.070-.024-.021-.006-.042-.011-.063-.015-.018-.004-.036-.007-.054-.009-.015-.002-.030-.003-.045-.004-.013-.001-.026-.001-.039-.001-.011 0-.022 0-.033.001-.009.001-.018.002-.027.003-.008.001-.016.003-.024.005-.007.002-.014.005-.021.007-.006.003-.012.006-.018.009-.005.003-.010.007-.015.011-.004.004-.008.008-.012.013-.003.005-.006.010-.009.016-.002.006-.004.012-.006.018-.001.006-.002.012-.003.019-.001.006-.001.012-.001.018 0 .006 0 .012.001.018.001.006.002.012.004.018.002.006.004.011.007.017.003.005.006.010.010.014.004.004.008.008.013.011.005.003.010.006.016.008.006.002.012.004.018.005.006.001.012.002.019.002.006 0 .012 0 .018-.001.006-.001.012-.002.018-.004.006-.002.012-.005.017-.008.005-.003.010-.007.014-.011.004-.004.008-.009.011-.014.003-.005.006-.011.008-.017.002-.006.004-.012.005-.019.001-.006.002-.013.002-.019 0-.007 0-.013-.001-.020-.001-.006-.002-.013-.004-.019-.002-.006-.005-.012-.008-.018-.003-.005-.007-.010-.011-.015-.004-.004-.009-.008-.014-.011-.005-.003-.011-.005-.017-.007-.006-.002-.012-.003-.018-.004-.006-.001-.012-.001-.018-.001-.006 0-.012.001-.018.002-.006.001-.012.003-.017.005-.005.002-.010.005-.015.008-.004.003-.008.007-.011.011-.003.004-.006.009-.008.014-.002.005-.004.011-.005.017-.001.006-.002.012-.002.018 0 .006.001.012.002.018.001.006.003.012.005.017.002.005.005.010.008.014.003.004.007.008.011.011.004.003.009.005.014.007.005.002.011.003.017.004.006.001.012.001.018.001.006 0 .012 0 .018-.001.006-.001.012-.002.017-.004.005-.002.010-.005.014-.008.004-.003.008-.007.011-.011.003-.004.006-.009.008-.014.002-.005.004-.011.005-.017.001-.006.002-.012.002-.018 0-.006-.001-.012-.002-.018-.001-.006-.003-.012-.005-.017-.002-.005-.005-.010-.008-.014-.003-.004-.007-.008-.011-.011-.004-.003-.009-.005-.014-.007-.005-.002-.011-.003-.017-.004-.006-.001-.012-.001-.018-.001-.006 0-.012 0-.018.001-.006.001-.012.002-.017.004-.005.002-.010.005-.014.008-.004.003-.008.007-.011.011-.003.004-.006.009-.008.014-.002.005-.004.011-.005.017-.001.006-.002.012-.002.018 0 .006.001.012.002.018.001.006.003.012.005.017.002.005.005.010.008.014.003.004.007.008.011.011.004.003.009.005.014.007.005.002.011.003.017.004.006.001.012.001.018.001.006 0 .012 0 .018-.001.006-.001.012-.002.017-.004.005-.002.010-.005.014-.008.004-.003.008-.007.011-.011.003-.004.006-.009.008-.014.002-.005.004-.011.005-.017.001-.006.002-.012.002-.018 0-.006-.001-.012-.002-.018-.001-.006-.003-.012-.005-.017-.002-.005-.005-.010-.008-.014-.003-.004-.007-.008-.011-.011-.004-.003-.009-.005-.014-.007-.005-.002-.011-.003-.017-.004-.006-.001-.012-.001-.018-.001-.006 0-.012 0-.018.001-.006.001-.012.002-.017.004-.005.002-.010.005-.014.008-.004.003-.008.007-.011.011-.003.004-.006.009-.008.014-.002.005-.004.011-.005.017-.001.006-.002.012-.002.018 0 .006.001.012.002.018.001.006.003.012.005.017.002.005.005.010.008.014.003.004.007.008.011.011.004.003.009.005.014.007.005.002.011.003.017.004.006.001.012.001.018.001.006 0 .012 0 .018-.001.006-.001.012-.002.017-.004.005-.002.010-.005.014-.008.004-.003.008-.007.011-.011.003-.004.006-.009.008-.014.002-.005.004-.011.005-.017.001-.006.002-.012.002-.018 0-.006-.001-.012-.002-.018-.001-.006-.003-.012-.005-.017-.002-.005-.005-.010-.008-.014-.003-.004-.007-.008-.011-.011-.004-.003-.009-.005-.014-.007-.005-.002-.011-.003-.017-.004-.006-.001-.012-.001-.018-.001z" />
                      </svg>
                    </a>
                  )}
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
