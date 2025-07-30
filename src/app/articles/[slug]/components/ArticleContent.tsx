import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { fetchEditorDetail } from '@/app/api/editors/fetchEditorDetail';
import { Editor } from '@/app/types/editor';
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

      imageUrls.slice(1).forEach((url, index) => {
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

  const mainImage = articleDetail.imageUrl[0];

  return (
    <div>
      {/* 메인 이미지 배너 - PC에서 더 높게 */}
      <div className="relative w-full h-[300px] md:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px] overflow-hidden">
        <Image
          src={mainImage}
          alt={articleDetail.title}
          fill
          className="object-cover"
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
                {editorDetail?.introduceImage ? (
                  <Image
                    src={editorDetail.introduceImage}
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
