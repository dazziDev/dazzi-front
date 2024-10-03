import { NextRequest, NextResponse } from 'next/server';

import { Author } from '@/store/useAuthorStore';

export async function GET(req: NextRequest) {
  // 예시 데이터 반환 (추후 DB 연동 가능)
  const authors: Author[] = [
    {
      id: 1,
      name: 'Teddy',
      src: '/img/dummy/profile/1.webp',
      rectSrc: '/img/dummy/profile/1.webp',
      introduction:
        '한국 맥덕 유망주에서 일본에서 진정한 맥덕으로 거듭난 에디터 Teddy입니다. \n 물론 맥주 외에도 우리네의 고단한 삶을 어루만져주는 다양한 음료들 모두 사랑합니다.\n 네이버 블로그에서는 찾기 어려운, 일본에서만 즐길 수 있는 다양한 마실거리에 대한 정보와 즐길 거리를 한국 독자분들과 함께 나누고 싶습니다.',
    },
    {
      id: 2,
      name: '인프라하는 고양이',
      src: '/img/dummy/profile/2.webp',
      rectSrc: '/img/dummy/profile/2.webp',
      introduction:
        '안녕하세요. 인프라하는 고양이입니다. 서비스가 안들와지면 저 탓을 해주세요... \n 고양이 알레르기 있어서 고양이는 못키웁니다. 잘부탁드립니다!',
    },
    {
      id: 3,
      name: '일생남',
      src: '/img/dummy/profile/3.webp',
      rectSrc: '/img/dummy/profile/3.webp',
      introduction:
        '일본의 엔터테이먼트계의 분야를 책임지고있는 dazzi의 개발자겸 에디터 일생남입니다.\n 일본의 인플루엔서관련 업계를 점령 후 지금은 일본의 만화업계까지 점령중! \n 일본의 재미난 크리에이티브 정보를 한국 독자분들과 함께 나누고 싶습니다.',
    },
    {
      id: 4,
      name: '반도산코',
      src: '/img/dummy/profile/4.jpg',
      rectSrc: '/img/dummy/profile/4.jpg',
      introduction: '반도산코',
    },
  ];
  return NextResponse.json(authors);
}
