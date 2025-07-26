'use client';
import 'swiper/css';
import 'swiper/css/pagination';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ArticleCategory } from '@/app/types/article';

interface CategorySectionProps {
  category: ArticleCategory;
}

const CategorySection: React.FC<CategorySectionProps> = ({ category }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="mb-16">
      {/* 섹션 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-foreground">
          {category.categoryName}
        </h2>
        <Link
          href={`/categories/${encodeURIComponent(category.permalink)}`}
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center group"
        >
          전체보기
          <svg
            className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      {/* 모바일 버전 */}
      <div className="block lg:hidden">
        <div className="space-y-4">
          {category.article.slice(0, 3).map((article, articleIndex) => (
            <Link
              href={`/articles/${article.permalink}`}
              key={articleIndex}
              className="block"
            >
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: articleIndex * 0.1 }}
                className="card hover-lift p-0 overflow-hidden group"
              >
                <div className="flex">
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover rounded-l-lg"
                    />
                  </div>
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-2 line-clamp-2">
                        {article.subtitle}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                      {article.editorId ? (
                        <Link
                          href={`/editors/${article.editorId}`}
                          className="hover:text-primary transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {article.editorName}
                        </Link>
                      ) : (
                        <span>{article.editorName}</span>
                      )}
                      <time>
                        {new Date(article.updateAt).toLocaleDateString('ko-KR')}
                      </time>
                    </div>
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </div>

      {/* 데스크톱 버전 */}
      <div className="hidden lg:grid grid-cols-3 xl:grid-cols-4 gap-6">
        {category.article.slice(0, 4).map((article, articleIndex) => (
          <Link href={`/articles/${article.permalink}`} key={articleIndex}>
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: articleIndex * 0.1 }}
              className="card hover-lift p-0 overflow-hidden group h-full"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-lg text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                  {article.title}
                </h3>

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
            </motion.article>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
