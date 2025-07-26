import { SkeletonImage, SkeletonPulse, SkeletonText } from './Skeleton';

const ArticlePageSkeleton = () => {
  return (
    <div className="mt-14">
      {/* 記事コンテンツのスケルトン */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* タイトル部分のスケルトン */}
        <div className="mb-8">
          <SkeletonPulse className="h-10 w-full mb-4" />
          <SkeletonPulse className="h-10 w-4/5 mb-6" />

          {/* メタ情報のスケルトン */}
          <div className="flex items-center space-x-4 mb-6">
            <SkeletonPulse className="h-4 w-24" />
            <SkeletonPulse className="h-4 w-32" />
          </div>
        </div>

        {/* メイン画像のスケルトン */}
        <SkeletonImage className="w-full h-64 md:h-96 mb-8" />

        {/* 記事本文のスケルトン */}
        <div className="prose max-w-none mb-12">
          <SkeletonText lines={8} className="space-y-4" />

          <div className="my-8">
            <SkeletonImage className="w-full h-48" />
          </div>

          <SkeletonText lines={6} className="space-y-4" />

          <div className="my-8">
            <SkeletonText lines={4} className="space-y-3" />
          </div>

          <SkeletonText lines={5} className="space-y-4" />
        </div>
      </div>

      {/* 関連記事セクションのスケルトン */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <SkeletonPulse className="h-8 w-48 mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <SkeletonImage className="w-full h-48" />
                <div className="p-4">
                  <SkeletonPulse className="h-6 w-full mb-2" />
                  <SkeletonPulse className="h-6 w-3/4 mb-4" />
                  <SkeletonPulse className="h-4 w-full mb-2" />
                  <SkeletonPulse className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* コメントセクションのスケルトン */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <SkeletonPulse className="h-8 w-32 mb-6" />

        {/* コメント入力フォームのスケルトン */}
        <div className="mb-8">
          <SkeletonPulse className="w-full h-24 mb-4" />
          <SkeletonPulse className="h-10 w-20" />
        </div>

        {/* 既存コメントのスケルトン */}
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border-b pb-4">
              <div className="flex items-start space-x-3">
                <SkeletonPulse className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <SkeletonPulse className="h-4 w-24 mb-2" />
                  <SkeletonText lines={2} className="space-y-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlePageSkeleton;
