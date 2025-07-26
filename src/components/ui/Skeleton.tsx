import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted bg-gray-200', className)}
    />
  );
};

// スケルトンアニメーション用のベースコンポーネント
const SkeletonPulse = ({ className }: SkeletonProps) => {
  return (
    <div
      className={cn(
        'animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded-md',
        'animate-[shimmer_2s_infinite]',
        className
      )}
    />
  );
};

// 複数行テキスト用スケルトン
const SkeletonText = ({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonPulse
          key={i}
          className={cn(
            'h-4',
            i === lines - 1 ? 'w-3/4' : 'w-full' // 最後の行を短くする
          )}
        />
      ))}
    </div>
  );
};

// 画像プレースホルダー用スケルトン
const SkeletonImage = ({ className }: SkeletonProps) => {
  return (
    <div
      className={cn(
        'bg-gray-200 flex items-center justify-center rounded-md',
        className
      )}
    >
      <svg
        className="w-8 h-8 text-gray-400"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

export { Skeleton, SkeletonImage, SkeletonPulse, SkeletonText };
