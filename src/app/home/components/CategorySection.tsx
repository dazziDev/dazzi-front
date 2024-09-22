'use client';
import { fetchCategories } from '@/app/home/components/FetchCategories';
import { useHomeCategoriesStore } from '@/store/useHomeCategoriesStore';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

const CategorySection = () => {
  const { categories, setCategories } = useHomeCategoriesStore();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    }
    getData();
  }, [setCategories]);

  return (
    <div>
      {/* 메인 배너 */}
      <div className="relative w-full h-screen lg:h-[667px] md:h-[500px] sm:h-[400px] mb-8">
        <Image
          src={categories[0]?.main.image || ''}
          alt="main-banner"
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
              {categories[0]?.main.title}
            </h2>
            <p className="md:text-base text-lg lg:text-left sm:text-left sm:max-w-[400px] max-w-[330px] lg:text-2xl lg:max-w-[680px] lg:leading-normal">
              {categories[0]?.main.subtitle}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto py-8 relative sm:px-4">
        {categories.map((categoryData, categoryIndex) => (
          <div key={categoryIndex} className="mb-12 w-full" ref={ref}>
            {categoryData.categories.map((category, index) => (
              <div key={index} className="mb-8">
                <h3 className="text-2xl font-bold mb-4 px-4 sm:px-0">
                  {category.category}
                  {/* 더보기 버튼 (PC에서만) */}
                  <div className="hidden sm:block top-9 right-0 absolute z-10">
                    {/* permalink */}
                    <Link href={`/category/${category.category}`}>
                      <p className="text-lg hover:underline hover:opacity-25 cursor-pointer">
                        더보기
                      </p>
                    </Link>
                  </div>
                </h3>
                <div className="hidden sm:block w-full h-px bg-gray-300 mb-6"></div>
                <p className="text-lg text-gray-600 mb-6 px-4 sm:px-0">
                  {category.subtitle}
                </p>

                {/* 모바일에서 캐러셀: 세로로 3개씩 표시하고 좌우로 넘김 */}
                <div className="block sm:hidden">
                  <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                  >
                    {Array.from({
                      length: Math.ceil(category.articles.length / 3),
                    }).map((_, i) => (
                      <SwiperSlide key={i}>
                        <div className="grid grid-cols-1 gap-4 bg-gray-50 p-4 rounded-md shadow-md">
                          {category.articles
                            .slice(i * 3, i * 3 + 3)
                            .map((article, articleIndex) => (
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
                                // whileHover={{ scale: 1.05 }}
                                className="flex bg-white rounded-lg shadow-md overflow-hidden relative"
                              >
                                <div className="relative h-[175px] min-w-[132px] max-w-[132px]">
                                  <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    className="object-cover"
                                    // style={{
                                    //   aspectRatio: '2/3',
                                    //   height: '100%',
                                    // }}
                                  />
                                </div>
                                <div className="ml-4 flex flex-col justify-between">
                                  <div className="flex-1">
                                    <h4 className="text-base font-semibold mt-3 mr-3">
                                      {article.title}
                                    </h4>
                                    <p className="text-gray-600 text-sm mr-2 mt-3">
                                      {article.subtitle.length > 30
                                        ? `${article.subtitle.slice(0, 30)}...`
                                        : article.subtitle}
                                    </p>
                                  </div>
                                  <p className="text-gray-400 text-xs mt-2 pb-2">
                                    {article.date}
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* PC */}
                <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                  {category.articles
                    // TODO: DOM을 직접 조작하는 방식이라 좋지않음
                    .slice(0, window.innerWidth >= 1280 ? 4 : 3)
                    .map((article, articleIndex) => (
                      // permalink
                      <Link
                        href={`/article/${article.title}`}
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
                            delay: 0.1,
                          }}
                          whileHover={{ scale: 1.05 }}
                          className="bg-white rounded-lg shadow-md overflow-hidden mx-auto w-full"
                        >
                          <div className="relative w-full aspect-square">
                            <Image
                              src={article.image}
                              alt={article.title}
                              fill
                              className="object-cover object-center"
                            />
                          </div>
                          <div className="p-4">
                            <h4 className="text-lg font-semibold mb-2">
                              {article.title}
                            </h4>
                            <p className="text-gray-600 mb-4 line-clamp-1">
                              {article.subtitle.length > 30
                                ? `${article.subtitle.slice(0, 30)}...`
                                : article.subtitle}
                            </p>
                            <p className="text-gray-400 text-sm mt-4">
                              {article.date}
                            </p>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
