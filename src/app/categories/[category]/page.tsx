import ArticleCard from './components/ArticleCard';
import FilterBar from './components/FilterBar';
import Pagination from './components/Pagination';

const CategoryPage = () => {
  return (
    <div>
      <FilterBar />
      <div>
        <ArticleCard title="기사 제목 1" />
        <ArticleCard title="기사 제목 2" />
        <ArticleCard title="기사 제목 3" />
      </div>
      <Pagination />
    </div>
  );
};

export default CategoryPage;
