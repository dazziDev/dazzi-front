const AuthorInfo = ({ name, bio }: { name: string; bio: string }) => {
  return (
    <div className="author-info">
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-sm text-gray-600">{bio}</p>
    </div>
  );
};

export default AuthorInfo;
