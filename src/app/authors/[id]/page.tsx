import AuthorInfo from '@/app/articles/[slug]/components/AuthorInfo';
import ArticleCard from '@/app/categories/[category]/components/ArticleCard';

interface Author {
  id: number;
  name: string;
  bio: string;
}

interface Article {
  id: number;
  title: string;
}

const AuthorPage = ({ params }: { params: { id: string } }) => {
  const author: Author = { id: 1, name: 'Editor 1', bio: 'Expert in culture.' }; // 실제로는 API 호출로 데이터를 가져옵니다.
  const articles: Article[] = [
    { id: 1, title: 'Tokyo Travel Guide' },
    { id: 2, title: 'Best Ramen in Japan' },
  ];

  return (
    <div>
      <AuthorInfo name={author.name} bio={author.bio} />
      <h2>작성한 기사</h2>
      <ul>
        {articles.map((article) => (
          <ArticleCard key={article.id} title={article.title} />
        ))}
      </ul>
    </div>
  );
};

export default AuthorPage;
