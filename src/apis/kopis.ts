import {XMLParser} from 'fast-xml-parser';
import {kopisInstance} from './axios';

const parser = new XMLParser();

export const getShowList = async ({
  startDate,
  endDate,
  page,
  size,
  showName,
  genreCode,
  performanceStateCode,
  signguCode,
  signguCodeSub,
}: {
  startDate: string;
  endDate: string;
  page: number;
  size: number;
  showName?: string;
  genreCode?: keyof typeof Genre;
  performanceStateCode?: keyof typeof PerformanceState;
  signguCode?: string;
  signguCodeSub?: string;
}): Promise<PerformanceInfo[]> => {
  try {
    const params: {
      stdate: string;
      eddate: string;
      cpage: number;
      rows: number;
      shprfnm?: string;
      shcate?: keyof typeof Genre;
      prfstate?: keyof typeof PerformanceState;
      signgucode?: string;
      signgucodesub?: string;
    } = {
      stdate: startDate,
      eddate: endDate,
      cpage: page,
      rows: size,
    };

    if (showName) {
      params.shprfnm = showName;
    }
    if (genreCode) {
      params.shcate = genreCode;
    }
    if (performanceStateCode) {
      params.prfstate = performanceStateCode;
    }
    if (signguCode) {
      params.signgucode = signguCode;
    }
    if (signguCodeSub) {
      params.signgucodesub = signguCodeSub;
    }

    const res = await kopisInstance.get('/pblprfr', {
      params: params,
    });

    return parser.parse(res.data).dbs.db as PerformanceInfo[];
  } catch (e) {
    console.error('Error in getShowList:', e);
    throw e;
  }
};

export const getShowDetail = async ({showId}: {showId: string}) => {
  try {
    const res = await kopisInstance.get(`/pblprfr/${showId}`);

    return parser.parse(res.data).dbs.db as PerformanceDetailInfo;
  } catch (e) {
    console.error('Error in getShowDetail:', e);
    throw e;
  }
};

export const getBoxOffice = async ({
  date,
  stsType,
  categoryCode,
  area,
}: {
  date: string;
  stsType: (typeof StsType)[keyof typeof StsType];
  categoryCode?: keyof typeof Category;
  area?: string;
}) => {
  try {
    const params: {
      ststype: (typeof StsType)[keyof typeof StsType];
      date: string;
      catecode?: keyof typeof Category;
      area?: string;
    } = {
      date,
      ststype: stsType,
    };

    if (categoryCode) {
      params.catecode = categoryCode;
    }
    if (area) {
      params.area = area;
    }

    const res = await kopisInstance.get('/boxoffice', {
      params: params,
    });

    return parser.parse(res.data).boxofs.boxof as BoxOffice;
  } catch (e) {
    console.error('Error in getBoxOffice:', e);
    throw e;
  }
};

const Genre = {
  AAAA: '연극',
  BBBB: '무용',
  BBBE: '대중무용',
  CCCA: '클래식',
  CCCC: '국악',
  CCCD: '대중음악',
  EEEA: '복합',
  EEEB: '서커스/마술',
  GGGA: '뮤지컬',
} as const;
const PerformanceState = {
  '01': '공연예정',
  '02': '공연중',
  '03': '공연완료',
} as const;
const StsType = {
  월별: 'month',
  주별: 'week',
  일별: 'day',
} as const;
const Category = {
  AAAA: '연극',
  GGGA: '뮤지컬',
  CCCA: '클래식',
  CCCC: '국악',
  CCCD: '대중음악',
  BBBC: '무용(서양/한국무용)',
  BBBR: '대중무용',
  EEEB: '서커스/마술',
  EEEA: '복합',
  KID: '아동',
  OPEN: '오픈런',
} as const;

type PerformanceDetailInfo = {
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
  genrenm: (typeof Genre)[keyof typeof Genre];
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
  prfstate: (typeof PerformanceState)[keyof typeof PerformanceState];
  sty: string;
  styurls: {
    styurl: string;
  };
  updatedate: string;
  visit: string;
};
type PerformanceInfo = {
  mt20id: string;
  prfnm: string;
  prfpdfrom: string;
  prfpdto: string;
  fcltynm: string;
  poster: string;
  genrenm: (typeof Genre)[keyof typeof Genre];
  openrun: string;
  prfstate: (typeof PerformanceState)[keyof typeof PerformanceState];
};
type BoxOffice = {
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
};
