const FilterBar = () => {
  return (
    <div className="flex items-center justify-between mb-8 p-4 bg-muted/30 rounded-lg border">
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-muted-foreground">정렬:</span>
        <select className="px-3 py-1 border border-border rounded-md text-sm bg-background">
          <option value="latest">최신순</option>
          <option value="oldest">오래된순</option>
          <option value="popular">인기순</option>
        </select>
      </div>

      <div className="flex items-center space-x-4">
        <span className="text-sm text-muted-foreground">보기:</span>
        <div className="flex border border-border rounded-md overflow-hidden">
          <button className="px-3 py-1 bg-primary text-primary-foreground text-sm">
            그리드
          </button>
          <button className="px-3 py-1 bg-background text-muted-foreground text-sm hover:bg-muted">
            리스트
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
