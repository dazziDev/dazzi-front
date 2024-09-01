const AuthorsPage = () => {
  const authors = [
    { id: 1, name: 'Editor 1', articleCount: 10 },
    { id: 2, name: 'Editor 2', articleCount: 5 },
  ];

  return (
    <div>
      <h1>작성자 목록</h1>
      <ul>
        {authors.map((author) => (
          <li key={author.id}>
            <a href={`/authors/${author.id}`}>아이콘 및 상세페이지 링크 </a>
            <div>이름, 소개문 등 </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorsPage;
