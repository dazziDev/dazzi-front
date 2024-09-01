import CategorySection from '@/app/home/components/CategorySection';
import FeaturedArticle from '@/app/home/components/FeaturedArticle';

const Home = () => {
  return (
    <div>
      <FeaturedArticle />
      <CategorySection category="문화" />
      <CategorySection category="음식" />
      <CategorySection category="여행" />
      <CategorySection category="취미" />
    </div>
  );
};

export default Home;
