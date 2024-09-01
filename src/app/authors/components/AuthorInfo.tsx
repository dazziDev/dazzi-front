interface AuthorInfoProps {
  name: string;
  bio: string;
}

const AuthorInfo = ({ name, bio }: AuthorInfoProps) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>{bio}</p>
    </div>
  );
};

export default AuthorInfo;
