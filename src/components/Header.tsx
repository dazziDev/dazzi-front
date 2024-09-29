'use client';
import Link from 'next/link';
import MobileMenu from './MobileMenu';

import { useEffect, useState } from 'react';

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // 스크롤 방향에 따른 헤더 표시/숨김 제어
  const controlHeader = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY === 0) {
        // 최상단에서 헤더 표시
        setShowHeader(true);
      } else if (window.scrollY < lastScrollY) {
        // 스크롤을 위로 올리면 헤더 숨김
        setShowHeader(false);
      } else {
        // 스크롤을 아래로 내리면 헤더 표시
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <Link href="/categories/culture">
            <span className="hover:text-gray-400 cursor-pointer">문화</span>
          </Link>
          <Link href="/categories/food">
            <span className="hover:text-gray-400 cursor-pointer">음식</span>
          </Link>
          <Link href="/categories/travel">
            <span className="hover:text-gray-400 cursor-pointer">여행</span>
          </Link>
          <Link href="/categories/hobby">
            <span className="hover:text-gray-400 cursor-pointer">취미</span>
          </Link>
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
