import { SkeletonImage, SkeletonText } from './Skeleton';

const MainBannerSkeleton = () => {
  return (
    <div className="relative w-full h-[70vh] lg:h-[600px] md:h-[500px] sm:h-[400px] mb-16 overflow-hidden rounded-2xl">
      {/* メイン画像のスケルトン */}
      <SkeletonImage className="w-full h-full" />

      {/* テキストオーバーレイのスケルトン */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end">
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
          <div className="max-w-4xl">
            {/* タイトルのスケルトン */}
            <div className="mb-4">
              <SkeletonText lines={2} className="space-y-3" />
            </div>

            {/* サブタイトルのスケルトン */}
            <div className="max-w-2xl mb-6">
              <SkeletonText lines={2} className="space-y-2" />
            </div>

            {/* CTA버튼のスケルトン */}
            <div className="w-32 h-12 bg-white/20 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* ページネーションドットのスケルトン */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-white bg-opacity-50 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
};

export default MainBannerSkeleton;
