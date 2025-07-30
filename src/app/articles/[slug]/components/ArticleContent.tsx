import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { fetchEditorDetail } from '@/app/api/editors/fetchEditorDetail';
import { Editor } from '@/app/types/editor';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import { useArticleDetailStore } from '@/store/useArticleDetailStore';

const ArticleContent: React.FC = () => {
  const { articleDetail } = useArticleDetailStore();
  const [processedText, setProcessedText] = useState<string>('');
  const [editorDetail, setEditorDetail] = useState<Editor | null>(null);
  const [editorLoading, setEditorLoading] = useState<boolean>(false);

  useEffect(() => {
    if (articleDetail) {
      const imageUrls = articleDetail.imageUrl;
      let textContent = articleDetail.text;

      // 듀얼 썸네일 시스템 확인
      let startIndex = 0;
      const hasLandscape =
        articleDetail.landscapeImageUrl &&
        articleDetail.landscapeImageUrl.trim() !== '';
      const hasPortrait =
        articleDetail.portraitImageUrl &&
        articleDetail.portraitImageUrl.trim() !== '';

      if (hasLandscape && hasPortrait) {
        // 듀얼 썸네일인 경우: 첫 2개는 썸네일
        startIndex = 2;
      } else if (hasLandscape || hasPortrait || imageUrls.length > 0) {
        // 단일 썸네일인 경우
        startIndex = 1;
      }

      // 본문 이미지 플레이스홀더 교체
      imageUrls.slice(startIndex).forEach((url, index) => {
        const placeholder = `__IMAGE_PLACEHOLDER_${index + 1}__`;
        // https가 ttps로 잘못된 경우 수정
        let correctedUrl = url;
        if (correctedUrl.startsWith('ttps://')) {
          correctedUrl = 'h' + correctedUrl;
        }
        textContent = textContent.replace(
          new RegExp(placeholder, 'g'),
          correctedUrl
        );
      });

      setProcessedText(textContent);
    }
  }, [articleDetail]);

  // エディター詳細情報取得
  useEffect(() => {
    if (articleDetail?.editorId) {
      const getEditorDetail = async () => {
        try {
          setEditorLoading(true);
          const editor = await fetchEditorDetail(articleDetail.editorId);
          setEditorDetail(editor);
        } catch (error) {
          console.error('에디터 정보 가져오기 실패:', error);
          setEditorDetail(null);
        } finally {
          setEditorLoading(false);
        }
      };
      getEditorDetail();
    }
  }, [articleDetail?.editorId]);

  if (!articleDetail) return null;

  // 반응형 이미지를 위한 article 객체 생성
  const articleForImage = {
    ...articleDetail,
    imageUrl: articleDetail.imageUrl[0], // 기본 이미지
    publishTime: new Date(articleDetail.updateAt), // 게시 시간을 Date 객체로 변환
    updateAt: new Date(articleDetail.updateAt), // updateAt도 Date 객체로 변환
  };

  return (
    <div>
      {/* 메인 이미지 배너 - 반응형 이미지 사용 */}
      <div className="relative w-full h-[300px] md:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px] overflow-hidden">
        <ResponsiveImage
          article={articleForImage}
          alt={articleDetail.title}
          fill
          priority
        />
      </div>

      <div className="w-full max-w-none mt-6 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* タイトルとサブタイトル */}
        <h1 className="text-2xl md:text-4xl font-bold mb-4">
          {articleDetail.title}
        </h1>
        <h2 className="text-lg md:text-xl text-gray-600 mb-6">
          {articleDetail.subtitle}
        </h2>
        <div className="text-sm text-gray-500 mb-4">
          <p>
            By {articleDetail.editorName} | Updated on{' '}
            {new Date(articleDetail.updateAt).toLocaleDateString()}
          </p>
        </div>
        {/* テキスト本文 */}
        <div
          className="prose prose-center max-w-none w-full overflow-hidden"
          dangerouslySetInnerHTML={{ __html: processedText }}
        />

        {/* 작성자 프로필 카드 */}
        <div className="mt-12 mb-8 border-t border-border pt-8">
          <div className="flex items-center gap-4">
            {articleDetail.editorId ? (
              <Link
                href={`/editors/${articleDetail.editorId}`}
                className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 hover:opacity-80 transition-opacity"
              >
                {editorDetail?.articleImage ? (
                  <Image
                    src={editorDetail.articleImage}
                    alt={articleDetail.editorName}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-lg font-semibold text-muted-foreground">
                      {articleDetail.editorName.charAt(0)}
                    </span>
                  </div>
                )}
              </Link>
            ) : (
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-muted flex items-center justify-center">
                <span className="text-lg font-semibold text-muted-foreground">
                  {articleDetail.editorName.charAt(0)}
                </span>
              </div>
            )}
            <div className="flex-1">
              {articleDetail.editorId ? (
                <Link
                  href={`/editors/${articleDetail.editorId}`}
                  className="hover:text-primary transition-colors"
                >
                  <h4 className="font-semibold text-foreground mb-1">
                    {articleDetail.editorName}
                  </h4>
                </Link>
              ) : (
                <h4 className="font-semibold text-foreground mb-1">
                  {articleDetail.editorName}
                </h4>
              )}

              {editorLoading ? (
                <p className="text-sm text-muted-foreground">
                  에디터 정보를 불러오는 중...
                </p>
              ) : editorDetail?.description ? (
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {editorDetail.description}
                </p>
              ) : articleDetail.editorId ? (
                <p className="text-sm text-muted-foreground italic">
                  에디터 소개가 아직 등록되지 않았습니다.
                </p>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  작성자 정보
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleContent;
