import {
  getPerformanceBoxOffice,
  getPerformanceDetail,
  getPerformanceFacilityDetail,
  getPerformanceList,
} from '@apis/kopis';

test('공연 목록 조회', async () => {
  const size = 10;
  const data = await getPerformanceList({
    startDate: '20240417',
    endDate: '20240423',
    page: 1,
    size,
    genreCode: 'AAAA',
  });
  expect(data?.length).toBe(size);
}, 10000);

test('공연 상세 조회', async () => {
  const data = await getPerformanceDetail({
    performanceId: 'PF239796',
  });

  expect(data?.genrenm).toBe('복합');
});

test('박스오피스조회', async () => {
  const data = await getPerformanceBoxOffice({
    date: '20240423',
    stsType: 'day',
  });
});

test('공연 시설 상세 조회', async () => {
  const id = 'FC001247';
  const data = await getPerformanceFacilityDetail(id);
  expect(data.mt10id).toBe(id);
});
