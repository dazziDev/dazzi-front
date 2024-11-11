'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { fetchCategories } from '@/app/api/categories/fetchCategories';

import MobileMenu from './MobileMenu';

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [categories, setCategories] = useState<
    { categoryId: number; categoryName: string; permalink: string }[]
  >([]);

  // 카테고리 데이터 불러오기
  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    getCategories();
  }, []);

  // 스크롤 방향에 따른 헤더 표시/숨김 제어
  const controlHeader = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY === 0) {
        setShowHeader(true);
      } else if (window.scrollY < lastScrollY) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlHeader);
      return () => {
        window.removeEventListener('scroll', controlHeader);
      };
    }
  }, [lastScrollY]);

  return (
    <header
      className={`${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      } fixed top-0 left-0 w-full h-14 z-50 bg-gray-800 transition-transform duration-300 ease-in-out`}
    >
      <div className="mx-auto flex items-center h-full px-6 justify-between">
        {/* 로고 */}
        <div className="flex items-center h-full">
          <Link href="/">
            <span className="text-2xl font-bold text-white">dazzi.</span>
          </Link>
        </div>
        {/* PC용 메뉴: 중앙 정렬 */}
        <nav className="hidden md:flex justify-center items-center space-x-8 text-white flex-grow">
          {categories.map((category) => (
            <Link
              key={category.categoryId}
              href={`/categories/${category.permalink}`}
            >
              <span className="hover:text-gray-400 cursor-pointer">
                {category.categoryName}
              </span>
            </Link>
          ))}
        </nav>
        {/* 모바일용 메뉴 */}
        <div className="md:hidden overflow-hidden overflow-y-hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
