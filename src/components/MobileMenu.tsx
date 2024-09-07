'use client';
import { useMenuStore } from '@/store/useMenuStore';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const MobileMenu = () => {
  const { isOpen, toggleMenu } = useMenuStore();

  const menuVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '100%' },
  };

  return (
    <>
      <button onClick={toggleMenu} className="focus:outline-none">
        <span className="text-white text-3xl">&#9776;</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-[#E6E6E6] flex flex-col pl-6 pr-6 pb-6"
          >
            {/* 상단 로고 및 닫기 버튼 */}
            <div className="flex items-center justify-between w-full h-[54px]">
              <span className="text-[24px] font-bold text-black">dazzi.</span>
              <button onClick={toggleMenu} className="text-black text-4xl">
                &times;
              </button>
            </div>

            {/* 메뉴 항목 */}
            <nav className="flex flex-col items-end mt-[24px] space-y-[24px] flex-grow">
              <Link href="/categories/food" onClick={toggleMenu}>
                <span className="block font-bold text-[24px] text-black">
                  음식
                </span>
              </Link>
              <Link href="/categories/travel" onClick={toggleMenu}>
                <span className="block font-bold text-[24px] text-black">
                  여행
                </span>
              </Link>
              <Link href="/categories/daily" onClick={toggleMenu}>
                <span className="block font-bold text-[24px] text-black">
                  일상
                </span>
              </Link>
              <Link href="/categories/interview" onClick={toggleMenu}>
                <span className="block font-bold text-[24px] text-black">
                  거리 인터뷰
                </span>
              </Link>
              <Link href="/categories/fashion" onClick={toggleMenu}>
                <span className="block font-bold text-[24px] text-black">
                  패션
                </span>
              </Link>
            </nav>

            {/* 하단 아이콘 */}
            <div className="flex space-x-[16px] mt-auto justify-center w-full">
              <Link href="https://instagram.com" onClick={toggleMenu}>
                <Image
                  src="/assets/img/icons/Instagram_R_Clr.webp"
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
                  src="/assets/img/icons/Youtube_R_Clr.svg"
                  width={36}
                  height={36}
                  alt="instagram"
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
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;
