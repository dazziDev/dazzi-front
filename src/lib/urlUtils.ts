/**
 * URL 관련 유틸리티 함수들
 */

/**
 * ttps:// 를 https://로 수정하는 함수
 * @param url 수정할 URL 문자열
 * @returns 수정된 URL 문자열
 */
export function fixTtpsUrl(url: string | null | undefined): string {
  if (!url) return '';

  const cleanUrl = url.trim();
  if (cleanUrl.startsWith('ttps://')) {
    return 'h' + cleanUrl;
  }
  return cleanUrl;
}

/**
 * 여러 URL들을 한번에 수정하는 함수
 * @param urls URL 문자열 배열
 * @returns 수정된 URL 문자열 배열
 */
export function fixTtpsUrls(urls: (string | null | undefined)[]): string[] {
  return urls.map((url) => fixTtpsUrl(url));
}

/**
 * 객체의 모든 이미지 URL 필드를 수정하는 함수
 * @param obj URL 필드를 포함한 객체
 * @param imageFields 수정할 이미지 필드 이름들
 * @returns 수정된 객체
 */
export function fixObjectImageUrls<T extends Record<string, any>>(
  obj: T,
  imageFields: (keyof T)[]
): T {
  const fixedObj = { ...obj };

  imageFields.forEach((field) => {
    if (typeof fixedObj[field] === 'string') {
      fixedObj[field] = fixTtpsUrl(fixedObj[field] as string) as T[keyof T];
    }
  });

  return fixedObj;
}
