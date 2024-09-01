const AuthorPage = ({ params }: { params: { id: string } }) => {
  const author = { id: 1, name: 'Editor 1', bio: 'Expert in culture.' };
  const articles = [
    { id: 1, title: 'Tokyo Travel Guide' },
    { id: 2, title: 'Best Ramen in Japan' },
  ];

  return (
    <div>
      <h1>{author.name}</h1>
      <p>{author.bio}</p>
      <h2>작성한 기사</h2>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>{article.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorPage;
