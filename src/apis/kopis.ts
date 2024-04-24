import {XMLParser} from 'fast-xml-parser';
import {kopisInstance} from '@apis/axios';
import {
  BoxOffice,
  Category,
  Genre,
  PerformanceDetailInfo,
  PerformanceInfo,
  PerformanceState,
  StsType,
} from '@interfaces/kopis.interface';

const parser = new XMLParser();

interface getShowListProps {
  startDate: string;
  endDate: string;
  page: number;
  size: number;
  showName?: string;
  genreCode?: keyof Genre;
  performanceStateCode?: keyof PerformanceState;
  signguCode?: string;
  signguCodeSub?: string;
}

interface getShowListApiParams {
  stdate: string;
  eddate: string;
  cpage: number;
  rows: number;
  shprfnm?: string;
  shcate?: keyof Genre;
  prfstate?: keyof PerformanceState;
  signgucode?: string;
  signgucodesub?: string;
}

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
}: getShowListProps): Promise<PerformanceInfo[]> => {
  try {
    const params: getShowListApiParams = {
      stdate: startDate,
      eddate: endDate,
      cpage: page,
      rows: size,
      shprfnm: showName,
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
    console.error('Error in getShowList:', e);
    throw e;
  }
};

interface getShowDetailProps {
  showId: string;
}

export const getShowDetail = async ({showId}: getShowDetailProps) => {
  try {
    const res = await kopisInstance.get(`/pblprfr/${showId}`);

    return parser.parse(res.data).dbs.db as PerformanceDetailInfo;
  } catch (e) {
    console.error('Error in getShowDetail:', e);
    throw e;
  }
};

interface getBoxOfficeProps {
  date: string;
  stsType: StsType[keyof StsType];
  categoryCode?: keyof Category;
  area?: string;
}

interface getBoxOfficeApiParams {
  ststype: StsType[keyof StsType];
  date: string;
  catecode?: keyof Category;
  area?: string;
}

export const getBoxOffice = async ({
  date,
  stsType,
  categoryCode,
  area,
}: getBoxOfficeProps) => {
  try {
    const params: getBoxOfficeApiParams = {
      date,
      ststype: stsType,
      catecode: categoryCode,
      area,
    };

    const res = await kopisInstance.get('/boxoffice', {
      params: params,
    });

    return parser.parse(res.data).boxofs.boxof as BoxOffice;
  } catch (e) {
    console.error('Error in getBoxOffice:', e);
    throw e;
  }
};
