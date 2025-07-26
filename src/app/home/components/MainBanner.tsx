'use client';

import 'swiper/css';
import 'swiper/css/pagination';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { fetchMainArticle } from '@/app/api/articles/fetchMainArticle';
import MainBannerSkeleton from '@/components/ui/MainBannerSkeleton';
import { useMainArticleStore } from '@/store/useMainArticleStore';

const MainBanner = () => {
  const { mainArticles, setMainArticles } = useMainArticleStore();

  useEffect(() => {
    const getMainArticles = async () => {
      try {
        const data = await fetchMainArticle();
        setMainArticles(data);
      } catch (error) {
        console.error('Error fetching main articles:', error);
      }
    };

    getMainArticles();
  }, [setMainArticles]);

  // ローディング中はスケルトンを表示
  if (!mainArticles.length) return <MainBannerSkeleton />;

  return (
    <div className="relative w-full h-[70vh] lg:h-[600px] md:h-[500px] sm:h-[400px] mb-16 overflow-hidden rounded-2xl">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet !bg-white/60 !w-2 !h-2',
          bulletActiveClass:
            'swiper-pagination-bullet-active !bg-white !scale-125',
        }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
        className="h-full rounded-2xl"
      >
        {mainArticles.map((article, idx) => (
          <SwiperSlide key={idx}>
            <Link
              href={`/articles/${article.permalink}`}
              className="block relative w-full h-full group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />

              <Image
                src={article.imageUrl || ''}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority={idx === 0}
              />

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute bottom-0 left-0 right-0 z-20 p-8 lg:p-12"
              >
                <div className="max-w-4xl">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight line-clamp-2"
                  >
                    {article.title}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-sm md:text-lg lg:text-xl text-white/90 mb-6 leading-relaxed line-clamp-2 max-w-2xl"
                  >
                    {article.subtitle}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium hover:bg-white/30 transition-all duration-300 group-hover:translate-x-1"
                  >
                    続きを読む
                    <svg
                      className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
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
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainBanner;
