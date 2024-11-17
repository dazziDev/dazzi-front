'use client';

import 'swiper/css';
import 'swiper/css/pagination';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { fetchMainArticle } from '@/app/api/articles/fetchMainArticle';
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

  // 로딩 바 혹은 아래 스켈레톤
  if (!mainArticles.length) return null;

  return (
    <div className="relative container mx-auto h-[calc(100vh-56px)] lg:h-[667px] md:h-[500px] sm:h-[400px] mb-8">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        className="h-full"
      >
        {mainArticles.map((article, idx) => (
          <SwiperSlide key={idx}>
            <Link
              href={`/articles/${article.permalink}`}
              key={idx}
              passHref
              prefetch={false}
            >
              <Image
                src={article.imageUrl || ''}
                alt={`main-banner-${idx}`}
                fill
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end lg:items-start md:items-start sm:items-end lg:justify-start md:justify-start sm:justify-start">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-x-0 bottom-[15%] p-4 text-white sm:relative sm:bottom-auto sm:left-auto sm:inset-auto lg:ml-8 lg:mt-8 md:mt-6 md:ml-6"
                >
                  <h2 className="text-3xl md:text-3xl font-bold mb-4 lg:text-6xl lg:mb-2 lg:text-left sm:text-left sm:max-w-[400px] max-w-[262px] lg:max-w-[680px] lg:leading-normal">
                    {article.title}
                  </h2>
                  <p className="md:text-base text-lg lg:text-left sm:text-left sm:max-w-[400px] max-w-[330px] lg:text-2xl lg:max-w-[680px] lg:leading-normal">
                    {article.subtitle}
                  </p>
                </motion.div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainBanner;
