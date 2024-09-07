import Link from 'next/link';
import MobileMenu from './MobileMenu';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white h-14">
      <div className="mx-auto flex items-center h-full justify-between px-6">
        {/* 로고 */}
        <div className="flex items-center h-full">
          <Link href="/">
            <span className="text-2xl font-bold">dazzi.</span>
          </Link>
        </div>
        {/* PC용 메뉴 */}
        {/* api연결 후 구성 */}
        <nav className="hidden md:flex justify-center items-center space-x-8 mx-auto">
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

        {/* 모바일용 메뉴 버튼 */}
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
