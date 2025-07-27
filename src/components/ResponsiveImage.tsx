'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

import { Article, MainArticle } from '@/app/types/article';
import { getResponsiveImageUrl } from '@/utils/getResponsiveImage';

interface ResponsiveImageProps {
  article: Article | MainArticle;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  article,
  alt,
  className = '',
  containerClassName = '',
  priority = false,
  fill = true,
  width,
  height,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const imageUrl = getResponsiveImageUrl(article, isMobile);

  // 개발 모드에서만 디버깅 로그
  if (process.env.NODE_ENV === 'development') {
    console.log('🖼️ ResponsiveImage 디버깅:', {
      isMobile,
      imageUrl,
      landscapeImageUrl: article.landscapeImageUrl,
      portraitImageUrl: article.portraitImageUrl,
      fallbackImageUrl: article.imageUrl,
      windowWidth: typeof window !== 'undefined' ? window.innerWidth : 'SSR',
    });
  }

  // 성능 최적화: aspectStyle 메모화
  const aspectStyle = useMemo(() => {
    return isMobile
      ? { aspectRatio: '3/4', paddingBottom: '133.33%' } // 모바일: 세로형 3:4
      : { aspectRatio: '4/3', paddingBottom: '75%' }; // PC: 가로형 4:3
  }, [isMobile]);

  if (fill) {
    return (
      <div
        className={`relative overflow-hidden ${containerClassName}`}
        style={aspectStyle}
      >
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className={`object-cover ${className}`}
          priority={priority}
          onError={(e) => {
            // 기본 플레이스홀더 이미지로 교체
            e.currentTarget.src =
              'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPklNQUdFPC90ZXh0Pjwvc3ZnPg==';
          }}
        />
      </div>
    );
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width || 400}
      height={height || 300}
      className={`object-cover ${className}`}
      priority={priority}
      onError={(e) => {
        // 기본 플레이스홀더 이미지로 교체
        e.currentTarget.src =
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPklNQUdFPC90ZXh0Pjwvc3ZnPg==';
      }}
    />
  );
};
