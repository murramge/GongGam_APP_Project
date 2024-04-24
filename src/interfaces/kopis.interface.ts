export interface PerformanceState {
  '01': '공연예정';
  '02': '공연중';
  '03': '공연완료';
}

export interface PerformanceCategory {
  AAAA: '연극';
  GGGA: '뮤지컬';
  CCCA: '클래식';
  CCCC: '국악';
  CCCD: '대중음악';
  BBBC: '무용(서양/한국무용)';
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
    styurl: string;
  };
  updatedate: string;
  visit: string;
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
