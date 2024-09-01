import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // 예시 데이터 반환 (추후 DB 연동 가능)
  return NextResponse.json([
    {
      id: 1,
      name: '이현우',
      src: '..',
      introduction: '안녕하세요',
    },
    {
      id: 2,
      name: '황용하',
      src: '..',
      introduction: '안녕하세요',
    },
    {
      id: 3,
      name: '이학찬',
      src: '..',
      introduction: '안녕하세요',
    },
    {
      id: 4,
      name: '박동민',
      src: '..',
      introduction: '안녕하세요',
    },
    {
      id: 5,
      name: '정현탁',
      src: '..',
      introduction: '안녕하세요',
    },
    {
      id: 6,
      name: '장태호',
      src: '..',
      introduction: '안녕하세요',
    },
    {
      id: 7,
      name: '박형일',
      src: '..',
      introduction: '안녕하세요',
    },
    {
      id: 8,
      name: '박정훈',
      src: '..',
      introduction: '안녕하세요)',
    },
  ]);
}
