import { SkeletonImage, SkeletonPulse, SkeletonText } from './Skeleton';

// PC版アーティクルカード用スケルトン
const ArticleCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mx-auto w-full h-full">
      {/* 画像スケルトン */}
      <SkeletonImage className="w-full aspect-square" />

      {/* コンテンツ部分のスケルトン */}
      <div className="p-4 flex flex-col justify-between">
        {/* タイトルスケルトン */}
        <div className="mb-2">
          <SkeletonPulse className="h-6 w-full mb-1" />
          <SkeletonPulse className="h-6 w-3/4" />
        </div>

        {/* サブタイトルスケルトン */}
        <div className="mb-4">
          <SkeletonPulse className="h-4 w-full" />
        </div>

        {/* 日付スケルトン */}
        <div className="mt-4">
          <SkeletonPulse className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
};

// モバイル版アーティクルカード用スケルトン
const MobileArticleCardSkeleton = () => {
  return (
    <div className="flex rounded-lg shadow-md overflow-hidden relative border">
      {/* 画像スケルトン */}
      <SkeletonImage className="h-[175px] min-w-[132px] max-w-[132px]" />

      {/* コンテンツ部分のスケルトン */}
      <div className="ml-4 flex flex-col justify-between flex-1 py-3">
        {/* タイトルスケルトン */}
        <div className="mr-3">
          <SkeletonPulse className="h-5 w-full mb-2" />
          <SkeletonPulse className="h-5 w-4/5" />
        </div>

        {/* サブタイトルスケルトン */}
        <div className="mr-2 mt-3">
          <SkeletonPulse className="h-4 w-full" />
        </div>

        {/* エディター名と日付スケルトン */}
        <div className="space-y-1 mt-2">
          <SkeletonPulse className="h-3 w-20" />
          <SkeletonPulse className="h-3 w-24 pb-2" />
        </div>
      </div>
    </div>
  );
};

// カテゴリセクション用スケルトン（モバイル・PC両対応）
const CategorySectionSkeleton = () => {
  return (
    <div className="mb-12 w-full">
      <div className="mb-8">
        {/* カテゴリタイトルスケルトン */}
        <div className="mb-4 px-4 sm:px-0">
          <SkeletonPulse className="h-8 w-48 mb-4" />
        </div>

        {/* 区切り線 */}
        <div className="hidden sm:block w-full h-px bg-gray-200 mb-6 animate-pulse"></div>

        {/* モバイル版スケルトン */}
        <div className="block sm:hidden">
          <div className="grid grid-cols-1 gap-4 p-4">
            {[...Array(3)].map((_, i) => (
              <MobileArticleCardSkeleton key={i} />
            ))}
          </div>
        </div>

        {/* PC版スケルトン */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <ArticleCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export {
  ArticleCardSkeleton,
  CategorySectionSkeleton,
  MobileArticleCardSkeleton,
};
