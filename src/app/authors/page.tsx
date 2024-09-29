'use client';
import { fetchAuthors } from '@/app/authors/components/FetchAuthors';
import { useAuthorStore } from '@/store/useAuthorStore';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';

const AuthorsPage = () => {
  const { authors, setAuthors } = useAuthorStore();

  // api 미구현
  // 상세 페이지로 이동
  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchAuthors();
        setAuthors(data);
      } catch (error) {
        console.error('Failed to fetch authors:', error);
      }
    }
    getData();
  }, [setAuthors]);

  const truncateText = (text: string, length: number) => {
    if (text.length <= length) return text;
    return text.slice(0, length) + '...';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">다찌의 에디터</h1>
      <p className="text-lg  text-left mb-12">
        다찌에서 매주 다양한 주제의 매거진을 위해 힘쓰고 있는 에디터를
        소개합니다.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {authors.map((author) => (
          <motion.div
            key={author.id}
            className="rounded-lg shadow-md overflow-hidden"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative w-full h-48 md:h-60">
              {/* Image 크기 조심 */}
              <Image
                src={author.rectSrc}
                alt={author.name}
                fill
                className="rounded-t-lg object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg md:text-xl font-semibold mb-2">
                {author.name}
              </h2>
              <p className="text-sm md:text-base">
                <span className="block md:hidden">
                  {truncateText(author.introduction, 30)}
                </span>
                <span className="hidden md:block">{author.introduction}</span>
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AuthorsPage;
