import Link from 'next/link';

import { Article } from '@/app/types/article';
import { ResponsiveImage } from '@/components/ResponsiveImage';

type ArticleCardProps = {
  article: Article;
};

const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <Link href={`/articles/${article.permalink}`} className="block group">
      <article className="card hover-lift p-0 overflow-hidden h-full">
        {/* 이미지 - 반응형 */}
        <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800">
          <ResponsiveImage
            article={article}
            alt={article.title}
            className="transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* 컨텐츠 */}
        <div className="p-6">
          <h2 className="font-semibold text-lg text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
            {article.title}
          </h2>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
            {article.subtitle}
          </p>

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
            {article.editorId ? (
              <Link
                href={`/editors/${article.editorId}`}
                className="font-medium hover:text-primary transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {article.editorName}
              </Link>
            ) : (
              <span className="font-medium">{article.editorName}</span>
            )}
            <time>
              {new Date(article.updateAt).toLocaleDateString('ko-KR')}
            </time>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ArticleCard;
