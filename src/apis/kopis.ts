import {XMLParser} from 'fast-xml-parser';
import {kopisInstance} from '@apis/axios';
import type {
  PerformanceBoxOffice,
  PerformanceCategory,
  PerformanceDetailInfo,
  PerformanceInfo,
  PerformanceState,
  PerformanceStsType,
  PerformanceFacilityDetail,
  PerformanceGenreValue,
  AreaCodeValue,
} from './kopis.d';

const parser = new XMLParser();

interface getPerformanceListProps {
  startDate: string;
  endDate: string;
  page: number;
  size: number;
  performanceName?: string;
  genreCode?: PerformanceGenreValue;
  performanceStateCode?: keyof PerformanceState;
  signguCode?: AreaCodeValue;
  signguCodeSub?: string;
}

interface getPerformanceListApiParams {
  stdate: string;
  eddate: string;
  cpage: number;
  rows: number;
  shprfnm?: string;
  shcate?: PerformanceGenreValue;
  prfstate?: keyof PerformanceState;
  signgucode?: AreaCodeValue;
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
    const data = parser.parse(res.data)?.dbs?.db;

    if (!data) {
      return [];
    }
    if (Array.isArray(data)) {
      return data as PerformanceInfo[];
    }
    return [data];
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

    const data = parser.parse(res.data).dbs.db;
    if (typeof data.styurls.styurl === 'string') {
      data.styurls.styurl = [data.styurls.styurl];
    }

    return data as PerformanceDetailInfo;
  } catch (e) {
    console.error('Error in getPerformanceDetail:', e);
    throw e;
  }
};

export interface getPerformanceBoxOfficeProps {
  date: string;
  stsType: PerformanceStsType[keyof PerformanceStsType];
  categoryCode?: keyof PerformanceCategory | string;
  area?: string;
}

interface getPerformanceApiParams {
  ststype: PerformanceStsType[keyof PerformanceStsType];
  date: string;
  catecode?: keyof PerformanceCategory | string;
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

    return parser.parse(res.data).boxofs.boxof as PerformanceBoxOffice[];
  } catch (e) {
    console.error('Error in getBoxOffice:', e);
    throw e;
  }
};

export const getPerformanceFacilityDetail = async (id: string) => {
  try {
    const res = await kopisInstance.get(`/prfplc/${id}`);

    return parser.parse(res.data).dbs.db as PerformanceFacilityDetail;
  } catch (e) {
    console.error('Error in getBoxOffice:', e);
    throw e;
  }
};
