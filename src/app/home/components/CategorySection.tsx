'use client';
import { fetchCategories } from '@/app/home/components/FetchCategories';
import { useHomeCategoriesStore } from '@/store/useHomeCategoriesStore';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const CategorySection = () => {
  const { categories, setCategories } = useHomeCategoriesStore();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

      <div className="container mx-auto px-4 py-8">
        {categories.map((categoryData, categoryIndex) => (
          <div key={categoryIndex} className="mb-12 w-full" ref={ref}>
            {categoryData.categories.map((category, index) => (
              <div key={index} className="mb-8">
                <h3 className="text-2xl font-bold mb-4">{category.category}</h3>
                <p className="text-lg text-gray-600 mb-6">
                  {category.subtitle}
                </p>

                {/* 반응형 그리드 */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                  {category.articles.map((article, articleIndex) => (
                    <motion.div
                      key={articleIndex}
                      initial={{ opacity: 0, y: 50 }}
                      animate={
                        inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                      }
                      transition={{ duration: 0.4, delay: articleIndex * 0.1 }}
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
                          {article.subtitle}
                        </p>
                        <p className="text-gray-400 text-sm">{article.date}</p>
                      </div>
                    </motion.div>
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
