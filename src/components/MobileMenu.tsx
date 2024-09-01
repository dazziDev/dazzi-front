'use client';
import Link from 'next/link';
import { useState } from 'react';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button onClick={toggleMenu} className="focus:outline-none">
        <span className="text-white text-3xl">&#9776;</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex flex-col items-center justify-center text-white">
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-4xl"
          >
            &times;
          </button>
          <nav className="space-y-8 text-2xl">
            <Link href="/categories/culture" onClick={toggleMenu}>
              문화
            </Link>
            <Link href="/categories/food" onClick={toggleMenu}>
              음식
            </Link>
            <Link href="/categories/travel" onClick={toggleMenu}>
              여행
            </Link>
            <Link href="/categories/hobby" onClick={toggleMenu}>
              취미
            </Link>
          </nav>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
