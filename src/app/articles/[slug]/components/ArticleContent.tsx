import Image from 'next/image';
import { useEffect, useState } from 'react';

import { useArticleDetailStore } from '@/store/useArticleDetailStore';

const ArticleContent: React.FC = () => {
  const { articleDetail } = useArticleDetailStore();
  const [processedText, setProcessedText] = useState<string>('');

  useEffect(() => {
    if (articleDetail) {
      const imageUrls = articleDetail.imageUrl;
      let textContent = articleDetail.text;

      imageUrls.slice(1).forEach((url, index) => {
        const placeholder = `__IMAGE_PLACEHOLDER_${index + 1}__`;
        textContent = textContent.replace(new RegExp(placeholder, 'g'), url);
      });

      setProcessedText(textContent);
    }
  }, [articleDetail]);

  if (!articleDetail) return null;

  const mainImage = articleDetail.imageUrl[0];

  return (
    <div>
      {/* 메인 이미지 배너 */}
      <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden">
        <Image
          src={mainImage}
          alt={articleDetail.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container mx-auto mt-6">
        {/* 타이틀과 서브타이틀 */}
        <h1 className="text-4xl font-bold mb-4 ml-3">{articleDetail.title}</h1>
        <h2 className="text-xl text-gray-600 mb-6 ml-3">
          {articleDetail.subtitle}
        </h2>
        <div className="text-sm text-gray-500 mb-4 ml-3">
          <p>
            By {articleDetail.editorName} | Updated on{' '}
            {new Date(articleDetail.updateAt).toLocaleDateString()}
          </p>
        </div>
        {/* 텍스트 본문 */}
        <div
          className="prose prose-center"
          dangerouslySetInnerHTML={{ __html: processedText }}
        />
      </div>
    </div>
  );
};

export default ArticleContent;
