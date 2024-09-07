import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // 예시 데이터 반환
  return NextResponse.json({ message: '카테고리 데이터 가져오기' });
}
