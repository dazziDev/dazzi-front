'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { fetchCategories } from '@/app/api/categories/fetchCategories';

import MobileMenu from './MobileMenu';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [categories, setCategories] = useState<
    { categoryId: number; categoryName: string; permalink: string }[]
  >([]);

  // 카테고리 데이터 가져오기
  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    getCategories();
  }, []);

  // 스크롤 감지로 헤더 스타일 변경
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-background/95 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* 로고 */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
            >
              dazzi
            </Link>
          </div>

          {/* 데스크톱 네비게이션 - 중앙 정렬 */}
          <nav className="hidden md:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center space-x-8">
              {categories.map((category) => (
                <Link
                  key={category.categoryId}
                  href={`/categories/${encodeURIComponent(category.permalink)}`}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  {category.categoryName}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </Link>
              ))}
              <Link
                href="/editors"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                다찌들
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            </div>
          </nav>

          {/* 오른쪽 영역 (모바일 메뉴 등) */}
          <div className="flex items-center">
            {/* 모바일 메뉴 */}
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
