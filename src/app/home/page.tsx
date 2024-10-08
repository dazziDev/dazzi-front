import CategorySection from '@/app/home/components/CategorySection';

const Home = () => {
  return (
    <div className="absolute top-0 w-full h-screen -z-10 sm:z-10 md:relative md:h-auto">
      {/* <FeaturedArticle /> */}
      <CategorySection />
    </div>
  );
};

export default Home;
