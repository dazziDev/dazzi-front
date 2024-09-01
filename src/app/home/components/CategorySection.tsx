type CategorySectionProps = {
  category: string;
};

const CategorySection = ({ category }: CategorySectionProps) => {
  return (
    <div>
      <h3>{category} 섹션</h3>
      <p>이 섹션에는 {category} 관련 기사가 나열됩니다.</p>
    </div>
  );
};

export default CategorySection;
