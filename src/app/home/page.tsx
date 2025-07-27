import ArticleList from '@/app/home/components/ArticleList';
import MainBanner from '@/app/home/components/MainBanner';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 여백 확보 */}
      <div className="pt-16">
        {/* 메인 배너는 전체 폭으로 */}
        <section className="px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8">
          <MainBanner />
        </section>

        {/* 나머지 컨텐츠도 전체 폭으로 확장 */}
        <main className="w-full max-w-none px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <ArticleList />
        </main>
      </div>
    </div>
  );
};

export default Home;
