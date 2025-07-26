'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { fetchCategories } from '@/app/api/categories/fetchCategories';
import { fetchEditors } from '@/app/api/editors/fetchEditors';
import { Category } from '@/app/types/category';
import { Editor } from '@/app/types/editor';

const Footer = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editors, setEditors] = useState<Editor[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesData, editorsData] = await Promise.all([
          fetchCategories(),
          fetchEditors(),
        ]);
        setCategories(categoriesData);
        setEditors(editorsData);
      } catch (error) {
        console.error('푸터 데이터 로딩 실패:', error);
      }
    };
    loadData();
  }, []);

  return (
    <footer className="bg-muted/30 border-t border-border mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 브랜드 섹션 */}
          <div className="col-span-1">
            <Link href="/" className="text-2xl font-bold text-foreground">
              dazzi
            </Link>
            <p className="text-muted-foreground mt-2 text-sm">
              일본에서 살아가는 한국인들이 전하는
              <br />
              생생한 일본 이야기
            </p>
          </div>

          {/* 카테고리 섹션 */}
          <div className="col-span-1">
            <h3 className="font-semibold text-foreground mb-4">카테고리</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.categoryId}>
                  <Link
                    href={`/categories/${encodeURIComponent(category.permalink)}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {category.categoryName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 다찌들 섹션 */}
          <div className="col-span-1">
            <h3 className="font-semibold text-foreground mb-4">다찌들</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/editors"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  전체 다찌들
                </Link>
              </li>
              {editors.slice(0, 5).map((editor) => (
                <li key={editor.editorId}>
                  <Link
                    href={`/editors/${editor.editorId}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {editor.editorName}
                  </Link>
                </li>
              ))}
              {editors.length > 5 && (
                <li>
                  <Link
                    href="/editors"
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    더보기 →
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* 정보 섹션 */}
          <div className="col-span-1">
            <h3 className="font-semibold text-foreground mb-4">정보</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:contact@dazzi.com"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  문의하기
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@Dazzi_mawari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 구분선 및 저작권 */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 dazzi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
