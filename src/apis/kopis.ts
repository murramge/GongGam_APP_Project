import {XMLParser} from 'fast-xml-parser';
import {kopisInstance} from '@apis/axios';
import {
  PerformanceBoxOffice,
  PerformanceCategory,
  PerformanceGenre,
  PerformanceDetailInfo,
  PerformanceInfo,
  PerformanceState,
  PerformanceStsType,
} from '@interfaces/kopis.interface';

const parser = new XMLParser();

interface getPerformanceListProps {
  startDate: string;
  endDate: string;
  page: number;
  size: number;
  performanceName?: string;
  genreCode?: keyof PerformanceGenre;
  performanceStateCode?: keyof PerformanceState;
  signguCode?: string;
  signguCodeSub?: string;
}

interface getPerformanceListApiParams {
  stdate: string;
  eddate: string;
  cpage: number;
  rows: number;
  shprfnm?: string;
  shcate?: keyof PerformanceGenre;
  prfstate?: keyof PerformanceState;
  signgucode?: string;
  signgucodesub?: string;
}

export const getPerformanceList = async ({
  startDate,
  endDate,
  page,
  size,
  performanceName,
  genreCode,
  performanceStateCode,
  signguCode,
  signguCodeSub,
}: getPerformanceListProps): Promise<PerformanceInfo[]> => {
  try {
    const params: getPerformanceListApiParams = {
      stdate: startDate,
      eddate: endDate,
      cpage: page,
      rows: size,
      shprfnm: performanceName,
      shcate: genreCode,
      prfstate: performanceStateCode,
      signgucode: signguCode,
      signgucodesub: signguCodeSub,
    };

    const res = await kopisInstance.get('/pblprfr', {
      params: params,
    });

    return parser.parse(res.data).dbs.db as PerformanceInfo[];
  } catch (e) {
    console.error('Error in getPerformanceList:', e);
    throw e;
  }
};

interface getPerformanceDetailProps {
  performanceId: string;
}

export const getPerformanceDetail = async ({
  performanceId,
}: getPerformanceDetailProps) => {
  try {
    const res = await kopisInstance.get(`/pblprfr/${performanceId}`);

    return parser.parse(res.data).dbs.db as PerformanceDetailInfo;
  } catch (e) {
    console.error('Error in getPerformanceDetail:', e);
    throw e;
  }
};

export interface getPerformanceBoxOfficeProps {
  date: string;
  stsType: PerformanceStsType[keyof PerformanceStsType];
  categoryCode?: keyof PerformanceCategory;
  area?: string;
}

interface getPerformanceApiParams {
  ststype: PerformanceStsType[keyof PerformanceStsType];
  date: string;
  catecode?: keyof PerformanceCategory;
  area?: string;
}

export const getPerformanceBoxOffice = async ({
  date,
  stsType,
  categoryCode,
  area,
}: getPerformanceBoxOfficeProps): Promise<PerformanceBoxOffice[]> => {
  try {
    const params: getPerformanceApiParams = {
      date,
      ststype: stsType,
      catecode: categoryCode,
      area,
    };

    const res = await kopisInstance.get('/boxoffice', {
      params: params,
    });

    console.log('res.data', res.data);

    return parser.parse(res.data).boxofs.boxof as PerformanceBoxOffice[];
  } catch (e) {
    console.error('Error in getBoxOffice:', e);
    throw e;
  }
};
