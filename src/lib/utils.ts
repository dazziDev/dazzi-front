// クラス名を結合するシンプルなユーティリティ関数
export function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
