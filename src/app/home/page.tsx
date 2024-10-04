import ArticleList from '@/app/home/components/ArticleList';
import MainBanner from '@/app/home/components/MainBanner';

const Home = () => {
  return (
    <div className="absolute top-0 w-full h-screen -z-10 sm:z-10 md:relative md:h-auto">
      <div>
        <MainBanner />
        <ArticleList />
      </div>
    </div>
  );
};

export default Home;
