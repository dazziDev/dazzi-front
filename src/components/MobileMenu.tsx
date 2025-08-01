'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { RemoveScroll } from 'react-remove-scroll';

import { fetchCategories } from '@/app/api/categories/fetchCategories'; // 카테고리 가져오기
import { useMenuStore } from '@/store/useMenuStore';

const MobileMenu = () => {
  const { isOpen, toggleMenu } = useMenuStore();
  const [categories, setCategories] = useState<
    { categoryId: number; categoryName: string; permalink: string }[]
  >([]);

  const menuVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '100%' },
  };

  // 카테고리 데이터 불러오기
  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    getCategories();
  }, []);

  return (
    <div className="">
      <button
        onClick={toggleMenu}
        className="focus:outline-none text-foreground"
      >
        <span className="text-3xl">&#9776;</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <RemoveScroll>
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 bg-background/95 backdrop-blur-md flex flex-col z-50 h-[calc(100vh-56px)]"
            >
              {/* 상단 로고 및 닫기 버튼 */}
              <div className="flex items-center justify-between w-full h-[54px] bg-background border-b border-border">
                <Link href="/" onClick={toggleMenu}>
                  <span className="text-2xl font-bold text-foreground pl-3">
                    dazzi.
                  </span>
                </Link>
                <button
                  onClick={toggleMenu}
                  className="text-4xl text-foreground pr-3"
                >
                  &times;
                </button>
              </div>

              {/* 카테고리 메뉴 항목 */}
              <nav className="flex flex-col items-end mt-[24px] space-y-[24px] flex-grow pl-6 pr-6 overflow-y-auto">
                {/* 고정 메뉴 - 다찌들 */}
                <Link href="/editors" onClick={toggleMenu}>
                  <span className="block font-bold text-[24px] text-foreground">
                    다찌들
                  </span>
                </Link>

                {/* 카테고리 구분선 */}
                {categories.length > 0 && (
                  <div className="w-full border-t border-border/30 my-2">
                    <span className="text-sm text-muted-foreground">
                      カテゴリー
                    </span>
                  </div>
                )}

                {/* 카테고리 목록 */}
                {categories.map((category) => (
                  <Link
                    key={category.categoryId}
                    href={`/categories/${encodeURIComponent(category.permalink)}`}
                    onClick={toggleMenu}
                  >
                    <span className="block font-bold text-[24px] text-foreground">
                      {category.categoryName}
                    </span>
                  </Link>
                ))}
              </nav>

              {/* 하단 아이콘 */}
              <div className="flex justify-center w-full pt-8 pb-20 border-t border-border/30">
                <Link
                  href="https://youtube.com/@Dazzi_mawari"
                  onClick={toggleMenu}
                >
                  <Image
                    src="/img/icons/Youtube_R_Clr.svg"
                    width={36}
                    height={36}
                    alt="youtube"
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      padding: '10px',
                      width: '48px',
                    }}
                  />
                </Link>
              </div>
            </motion.div>
          </RemoveScroll>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
