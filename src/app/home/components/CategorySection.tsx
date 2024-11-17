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
    <div ref={ref} className="mb-12 w-full">
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4 px-4 sm:px-0">
          {category.categoryName}
          <div className="hidden sm:block top-9 right-0 absolute z-10">
            <Link href={`/category/${category.categoryId}`}>
              <p className="text-lg hover:underline hover:opacity-25 cursor-pointer">
                더보기
              </p>
            </Link>
          </div>
        </h3>
        <div className="hidden sm:block w-full h-px bg-gray-300 mb-6"></div>

        {/* MOBILE */}
        <div className="block sm:hidden">
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
          >
            {Array.from({
              length: Math.ceil(category.article.length / 3),
            }).map((_, i) => (
              <SwiperSlide key={i}>
                <div className="grid grid-cols-1 gap-4 p-4 rounded-md shadow-md">
                  {category.article
                    .slice(i * 3, i * 3 + 3)
                    .map((article, articleIndex) => (
                      <Link
                        href={`/articles/${article.permalink}`}
                        key={articleIndex}
                      >
                        <motion.div
                          key={articleIndex}
                          initial={{ opacity: 0, y: 50 }}
                          animate={
                            inView
                              ? { opacity: 1, y: 0 }
                              : { opacity: 0, y: 50 }
                          }
                          transition={{
                            duration: 0.4,
                            delay: articleIndex * 0.1,
                          }}
                          className="flex rounded-lg shadow-md overflow-hidden relative border"
                        >
                          <div className="relative h-[175px] min-w-[132px] max-w-[132px]">
                            <Image
                              src={article.imageUrl}
                              alt={article.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="ml-4 flex flex-col justify-between">
                            <h4 className="text-base font-semibold mt-3 mr-3">
                              {article.title}
                            </h4>
                            <p className="text-sm mr-2 mt-3">
                              {article.subtitle.length > 30
                                ? `${article.subtitle.slice(0, 30)}...`
                                : article.subtitle}
                            </p>
                            <p className="text-xs mt-2">{article.editorName}</p>
                            <p className="text-xs pb-2">
                              {new Date(article.updateAt).toLocaleDateString()}
                            </p>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* PC */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {category.article.slice(0, 4).map((article, articleIndex) => (
            <Link href={`/articles/${article.permalink}`} key={articleIndex}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg shadow-md overflow-hidden mx-auto w-full h-full"
              >
                <div className="relative w-full aspect-square">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between">
                  <h4 className="text-lg font-semibold mb-2 dark:text-gray-800">
                    {article.title}
                  </h4>
                  <p className="text-gray-600 mb-4 line-clamp-1">
                    {article.subtitle.length > 30
                      ? `${article.subtitle.slice(0, 30)}...`
                      : article.subtitle}
                  </p>
                  <p className="text-gray-400 text-sm mt-4">
                    {new Date(article.updateAt).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
