import { NextRequest, NextResponse } from 'next/server';

import { Categories } from '@/store/useHomeCategoriesStore';

export async function GET(req: NextRequest) {
  // 예시 데이터 반환
  // 아래 형식의 데이터가 카테고리는 아니지 카테고리는 카테고리만, 이건 카테고리 안에 들어가는 최신순 게시글들의 요약버전
  const categories: Categories[] = [
    {
      main: {
        title: '도쿄 플리마켓에서 구매한 나만의 특별한 인테리어 소품',
        subtitle:
          '쇼핑의 도시 도쿄, 진자, 오모테산도, 시부야도 좋지만 나는 매주 주말 귀여운 소품들을 수집하러 플리마켓으로 떠난다.',
        image: '/img/homeCategoriesDummy/1.jpeg',
      },
      categories: [
        {
          category: '문화',
          subtitle: '도쿄에서 만나는 특별한 문화 현장',
          articles: [
            {
              title: '뉴진스 도쿄돔 팬미팅, 제가 가보겠습니다',
              subtitle: '회사 조퇴하고 다녀온 뉴진스 팬미팅 후기',
              date: '2024.09.08',
              image: '/img/homeCategoriesDummy/2.jpeg',
            },
            {
              title: '도쿄에 새로 오픈한 관광 명소 팀랩 보더리스',
              subtitle: '올해 2월 아자부다이에서 새단장 오픈한 팀랩',
              date: '2024.06.26',
              image: '/img/homeCategoriesDummy/3.jpeg',
            },
            {
              title: '1300년 동안 도쿄를 지켜온 신사',
              subtitle: '아키하바라 도보 10분 거리에 위치한 간다 묘진',
              date: '2024.06.26',
              image: '/img/homeCategoriesDummy/4.jpeg',
            },
            {
              title: '도쿄에 새로 오픈한 관광 명소 팀랩 보더리스',
              subtitle: '올해 2월 아자부다이에서 새단장 오픈한 팀랩',
              date: '2024.06.26',
              image: '/img/homeCategoriesDummy/3.jpeg',
            },
            {
              title: '1300년 동안 도쿄를 지켜온 신사',
              subtitle: '아키하바라 도보 10분 거리에 위치한 간다 묘진',
              date: '2024.06.26',
              image: '/img/homeCategoriesDummy/4.jpeg',
            },
            {
              title: '뉴진스 도쿄돔 팬미팅, 제가 가보겠습니다',
              subtitle: '회사 조퇴하고 다녀온 뉴진스 팬미팅 후기',
              date: '2024.09.08',
              image: '/img/homeCategoriesDummy/2.jpeg',
            },
            {
              title: '뉴진스 도쿄돔 팬미팅, 제가 가보겠습니다',
              subtitle: '회사 조퇴하고 다녀온 뉴진스 팬미팅 후기',
              date: '2024.09.08',
              image: '/img/homeCategoriesDummy/2.jpeg',
            },
            {
              title: '도쿄에 새로 오픈한 관광 명소 팀랩 보더리스',
              subtitle: '올해 2월 아자부다이에서 새단장 오픈한 팀랩',
              date: '2024.06.26',
              image: '/img/homeCategoriesDummy/3.jpeg',
            },
            {
              title: '1300년 동안 도쿄를 지켜온 신사',
              subtitle: '아키하바라 도보 10분 거리에 위치한 간다 묘진',
              date: '2024.06.26',
              image: '/img/homeCategoriesDummy/4.jpeg',
            },
            {
              title: '도쿄에 새로 오픈한 관광 명소 팀랩 보더리스',
              subtitle: '올해 2월 아자부다이에서 새단장 오픈한 팀랩',
              date: '2024.06.26',
              image: '/img/homeCategoriesDummy/3.jpeg',
            },
            {
              title: '1300년 동안 도쿄를 지켜온 신사',
              subtitle: '아키하바라 도보 10분 거리에 위치한 간다 묘진',
              date: '2024.06.26',
              image: '/img/homeCategoriesDummy/4.jpeg',
            },
            {
              title: '뉴진스 도쿄돔 팬미팅, 제가 가보겠습니다',
              subtitle: '회사 조퇴하고 다녀온 뉴진스 팬미팅 후기',
              date: '2024.09.08',
              image: '/img/homeCategoriesDummy/2.jpeg',
            },
          ],
        },
        {
          category: '음식',
          subtitle: '일본의 독특한 미식 경험',
          articles: [
            {
              title: '우에노는 처음이라꼬?',
              subtitle: '우에노, 죽돌이가 알려주는 우에노 핫플',
              date: '2024.06.26',
              image: '/img/homeCategoriesDummy/5.jpeg',
            },
            {
              title: '출장 온 장인이 만드는 우동',
              subtitle: '일본 최대 우동체인 마루가메우동',
              date: '2024.06.26',
              image: '/img/homeCategoriesDummy/6.png',
            },
            {
              title: '오니기리+수제맥주 조합은 처음이지?',
              subtitle: '도쿄 시부야에 위치한 덴마크 대표 수제맥주집',
              date: '2024.06.26',
              image: '/img/homeCategoriesDummy/7.jpeg',
            },
            {
              title: '오니기리+수제맥주 조합은 처음이지?',
              subtitle: '도쿄 시부야에 위치한 덴마크 대표 수제맥주집',
              date: '2024.06.26',
              image: '/img/homeCategoriesDummy/7.jpeg',
            },
            {
              title: '오니기리+수제맥주 조합은 처음이지?',
              subtitle: '도쿄 시부야에 위치한 덴마크 대표 수제맥주집',
              date: '2024.06.26',
              image: '/img/homeCategoriesDummy/7.jpeg',
            },
            {
              title: '오니기리+수제맥주 조합은 처음이지?',
              subtitle: '도쿄 시부야에 위치한 덴마크 대표 수제맥주집',
              date: '2024.06.26',
              image: '/img/homeCategoriesDummy/7.jpeg',
            },
            {
              title: '오니기리+수제맥주 조합은 처음이지?',
              subtitle: '도쿄 시부야에 위치한 덴마크 대표 수제맥주집',
              date: '2024.06.26',
              image: '/img/homeCategoriesDummy/7.jpeg',
            },
            {
              title: '오니기리+수제맥주 조합은 처음이지?',
              subtitle: '도쿄 시부야에 위치한 덴마크 대표 수제맥주집',
              date: '2024.06.26',
              image: '/img/homeCategoriesDummy/7.jpeg',
            },
            {
              title: '오니기리+수제맥주 조합은 처음이지?',
              subtitle: '도쿄 시부야에 위치한 덴마크 대표 수제맥주집',
              date: '2024.06.26',
              image: '/img/homeCategoriesDummy/7.jpeg',
            },
            {
              title: '오니기리+수제맥주 조합은 처음이지?',
              subtitle: '도쿄 시부야에 위치한 덴마크 대표 수제맥주집',
              date: '2024.06.26',
              image: '/img/homeCategoriesDummy/7.jpeg',
            },
          ],
        },
        {
          category: '여행',
          subtitle: '도쿄에서 경험하는 특별한 여행',
          articles: [
            {
              title: '도쿄돔에서 보낸 짜릿한 순간',
              subtitle: '뉴진스 도쿄 콘서트 생생한 후기',
              date: '2024.06.26',
              image: '/img/homeCategoriesDummy/7.jpeg',
            },
            {
              title: '일본 여행 중 만난 현지인들',
              subtitle: '도쿄의 유명한 레스토랑에서 찍은 단체 사진',
              date: '2024.06.26',
              image: '/img/homeCategoriesDummy/7.jpeg',
            },
            {
              title: '밤하늘을 수놓은 빛의 축제',
              subtitle: '도쿄에서 매년 열리는 유명한 빛 축제',
              date: '2024.06.26',
              image: '/img/homeCategoriesDummy/7.jpeg',
            },
            {
              title: '밤하늘을 수놓은 빛의 축제',
              subtitle: '도쿄에서 매년 열리는 유명한 빛 축제',
              date: '2024.06.26',
              image: '/img/homeCategoriesDummy/7.jpeg',
            },
            {
              title: '밤하늘을 수놓은 빛의 축제',
              subtitle: '도쿄에서 매년 열리는 유명한 빛 축제',
              date: '2024.06.26',
              image: '/img/homeCategoriesDummy/7.jpeg',
            },
            {
              title: '밤하늘을 수놓은 빛의 축제',
              subtitle: '도쿄에서 매년 열리는 유명한 빛 축제',
              date: '2024.06.26',
              image: '/img/homeCategoriesDummy/7.jpeg',
            },
            {
              title: '밤하늘을 수놓은 빛의 축제',
              subtitle: '도쿄에서 매년 열리는 유명한 빛 축제',
              date: '2024.06.26',
              image: '/img/homeCategoriesDummy/7.jpeg',
            },
            {
              title: '밤하늘을 수놓은 빛의 축제',
              subtitle: '도쿄에서 매년 열리는 유명한 빛 축제',
              date: '2024.06.26',
              image: '/img/homeCategoriesDummy/7.jpeg',
            },
            {
              title: '밤하늘을 수놓은 빛의 축제',
              subtitle: '도쿄에서 매년 열리는 유명한 빛 축제',
              date: '2024.06.26',
              image: '/img/homeCategoriesDummy/7.jpeg',
            },
            {
              title: '밤하늘을 수놓은 빛의 축제',
              subtitle: '도쿄에서 매년 열리는 유명한 빛 축제',
              date: '2024.06.26',
              image: '/img/homeCategoriesDummy/7.jpeg',
            },
            {
              title: '밤하늘을 수놓은 빛의 축제',
              subtitle: '도쿄에서 매년 열리는 유명한 빛 축제',
              date: '2024.06.26',
              image: '/img/homeCategoriesDummy/7.jpeg',
            },
          ],
        },
      ],
    },
  ];
  return NextResponse.json(categories);
}
