'use client';
import { useMenuStore } from '@/store/useMenuStore';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { RemoveScroll } from 'react-remove-scroll';

const MobileMenu = () => {
  const { isOpen, toggleMenu } = useMenuStore();

  const menuVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '100%' },
  };

  return (
    <div className="">
      <button onClick={toggleMenu} className="focus:outline-none text-white">
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
              className="fixed inset-0 bg-gray-900 flex flex-col pb-6 z-50 h-[calc(100vh-56px)]"
            >
              {/* 상단 로고 및 닫기 버튼 */}
              <div className="flex items-center justify-between w-full h-[54px] bg-black">
                <Link href="/" onClick={toggleMenu}>
                  <span className="text-2xl font-bold text-white pl-3">
                    dazzi.
                  </span>
                </Link>
                <button
                  onClick={toggleMenu}
                  className="text-4xl text-white pr-3"
                >
                  &times;
                </button>
              </div>

              {/* 메뉴 항목 */}
              <nav className="flex flex-col items-end mt-[24px] space-y-[24px] flex-grow pl-6 pr-6">
                <Link href="/categories/food" onClick={toggleMenu}>
                  <span className="block font-bold text-[24px] text-white">
                    음식
                  </span>
                </Link>
                <Link href="/categories/travel" onClick={toggleMenu}>
                  <span className="block font-bold text-[24px] text-white">
                    여행
                  </span>
                </Link>
                <Link href="/categories/daily" onClick={toggleMenu}>
                  <span className="block font-bold text-[24px] text-white">
                    일상
                  </span>
                </Link>
                <Link href="/categories/interview" onClick={toggleMenu}>
                  <span className="block font-bold text-[24px] text-white">
                    거리 인터뷰
                  </span>
                </Link>
                <Link href="/categories/fashion" onClick={toggleMenu}>
                  <span className="block font-bold text-[24px] text-white">
                    패션
                  </span>
                </Link>
              </nav>

              {/* {중간 네비} */}
              <div className="pl-6 pr-6 pb-6">
                <Link href="/authors" onClick={toggleMenu}>
                  <span className="block font-bold text-[24px] text-white">
                    다찌의 에디터
                  </span>
                </Link>
              </div>
              {/* 하단 아이콘 */}
              <div className="flex space-x-[16px] mt-auto justify-center w-full pb-6">
                <Link href="https://instagram.com" onClick={toggleMenu}>
                  <Image
                    src="/img/icons/Instagram_R_Clr.webp"
                    width={48}
                    height={48}
                    alt="instagram"
                  />
                </Link>
                <Link
                  href="https://youtube.com/@namagawaki1229"
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
