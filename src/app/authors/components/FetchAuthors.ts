import { Author } from '@/store/useAuthorStore';

// 더미 api 호출
export const fetchAuthors = async (): Promise<Author[]> => {
  const res = await fetch('/api/authors');
  if (!res.ok) {
    throw new Error('Failed to fetch authors');
  }
  return res.json();
};
