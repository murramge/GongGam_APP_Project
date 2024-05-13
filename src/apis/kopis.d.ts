export interface PerformanceState {
  '01': '공연예정';
  '02': '공연중';
  '03': '공연완료';
}
export const GenreCode = {
  연극: 'AAAA',
  뮤지컬: 'GGGA',
  클래식: 'CCCA',
  국악: 'CCCC',
  대중음악: 'CCCD',
  무용: 'BBBC',
  대중무용: 'BBBR',
  '서커스/마술': 'EEEB',
  복합: 'EEEA',
  아동: 'KID',
  오픈런: 'OPEN',
} as const;

export type PerformanceGenreKey = Exclude<
  keyof typeof GenreCode,
  '아동' | '오픈런'
>;
export type PerformanceGenreValue = (typeof GenreCode)[keyof typeof GenreCode];
export type BoxOfficeGenreKey = keyof typeof GenreCode;
export interface PerformanceCategory {
  AAAA: '연극';
  GGGA: '뮤지컬';
  CCCA: '클래식';
  CCCC: '국악';
  CCCD: '대중음악';
  BBBC: '무용';
  BBBR: '대중무용';
  EEEB: '서커스/마술';
  EEEA: '복합';
  KID: '아동';
  OPEN: '오픈런';
}

export interface PerformanceGenre {
  AAAA: '연극';
  BBBB: '무용';
  BBBE: '대중무용';
  CCCA: '클래식';
  CCCC: '국악';
  CCCD: '대중음악';
  EEEA: '복합';
  EEEB: '서커스/마술';
  GGGA: '뮤지컬';
}

export interface PerformanceDetailInfo {
  area: string;
  child: string;
  daehakro: string;
  dtguidance: string;
  entrpsnm: string;
  entrpsnmA: string;
  entrpsnmH: string;
  entrpsnmP: string;
  entrpsnmS: string;
  fcltynm: string;
  festival: string;
  genrenm: PerformanceGenre[keyof PerformanceGenre];
  mt10id: string;
  mt20id: string;
  musicalcreate: string;
  musicallicense: string;
  openrun: string;
  pcseguidance: string;
  poster: string;
  prfage: string;
  prfcast: string;
  prfcrew: string;
  prfnm: string;
  prfpdfrom: string;
  prfpdto: string;
  prfruntime: string;
  prfstate: PerformanceState[keyof PerformanceState];
  sty: string;
  styurls: {
    styurl: string[];
  };
  updatedate: string;
  visit: string;
  relates: {
    relate: {
      relatenm: string;
      relateurl: string;
    }[];
  };
}

export interface PerformanceInfo {
  mt20id: string;
  prfnm: string;
  prfpdfrom: string;
  prfpdto: string;
  fcltynm: string;
  poster: string;
  genrenm: PerformanceGenre[keyof PerformanceGenre];
  openrun: string;
  prfstate: PerformanceState[keyof PerformanceState];
}

export interface PerformanceBoxOffice {
  area: string;
  prfdtcnt: number;
  prfpd: string;
  cate: string;
  prfplcnm: string;
  prfnm: string;
  rnum: number;
  seatcnt: number;
  poster: string;
  mt20id: string;
}
export interface PerformanceStsType {
  월별: 'month';
  주별: 'week';
  일별: 'day';
}

export interface PerformanceFacilityDetail {
  // 공연시설명
  fcltynm: string; // 올림픽공원
  // 공연시설ID
  mt10id: string; // FC001247
  // 공연장 수
  mt13cnt: number; // 9
  // 시설특성
  fcltychartr: string; // 기타(공공)
  // 개관연도
  opende: number; // 1986
  // 객석 수
  seatscale: number; // 32349
  // 전화번호
  telno: string; // 02-410-1114
  // 홈페이지
  relateurl: string; // http://www.olympicpark.co.kr/
  // 주소
  adres: string; // 서울특별시 송파구 올림픽로 424 올림픽공원 (방이동)
  // 위도
  la: number; // 37.52112
  // 경도
  lo: number; // 127.12836360000005
  // 레스토랑
  restaurant: 'Y' | 'N'; // Y
  // 카페
  cafe: 'Y' | 'N'; // Y
  // 편의점
  store: 'Y' | 'N'; // Y
  // 놀이방
  nolibang: 'Y' | 'N'; // N
  // 수유실
  suyu: 'Y' | 'N'; // N
  // 장애시설-주차장
  parkbarrier: 'Y' | 'N'; // N
  // 장애시설-화장실
  restbarrier: 'Y' | 'N'; // N
  // 장애시설-경사로
  runwbarrier: 'Y' | 'N'; // N
  // 장애시설-엘리베이터
  elevbarrier: 'Y' | 'N'; // N
  // 주차지설
  parkinglot: 'Y' | 'N'; // Y
}

export const AreaCode = {
  서울: 11,
  인천: 28,
  대전: 30,
  대구: 27,
  광주: 29,
  부산: 26,
  울산: 31,
  세종: 36,
  경기: 41,
  충북: 43,
  충남: 44,
  경북: 47,
  경남: 48,
  전북: 45,
  전남: 46,
  강원: 51,
  제주: 50,
  대학로: 'UNI',
} as const;
export type AreaCodeKey = keyof typeof AreaCode;
export type AreaCodeValue = (typeof AreaCode)[keyof typeof AreaCode];
