const Pagination = () => {
  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        className="px-3 py-2 text-sm border border-border rounded-md hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
        disabled
      >
        이전
      </button>

      <div className="flex space-x-1">
        <button className="px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md">
          1
        </button>
        <button className="px-3 py-2 text-sm border border-border rounded-md hover:bg-muted">
          2
        </button>
        <button className="px-3 py-2 text-sm border border-border rounded-md hover:bg-muted">
          3
        </button>
      </div>

      <button className="px-3 py-2 text-sm border border-border rounded-md hover:bg-muted">
        다음
      </button>
    </div>
  );
};

export default Pagination;
