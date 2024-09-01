type ArticleCardProps = {
  title: string;
};

const ArticleCard = ({ title }: ArticleCardProps) => {
  return (
    <div>
      <h4>{title}</h4>
      <p>기사에 대한 간략한 설명입니다.</p>
    </div>
  );
};

export default ArticleCard;
