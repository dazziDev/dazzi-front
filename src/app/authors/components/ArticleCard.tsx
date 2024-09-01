interface ArticleCardProps {
  title: string;
}

const ArticleCard = ({ title }: ArticleCardProps) => {
  return (
    <li>
      <a href="#">{title}</a>
    </li>
  );
};

export default ArticleCard;
