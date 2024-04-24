import {getBoxOffice, getShowDetail, getShowList} from '@apis/kopis';

test('공연 목록 조회', async () => {
  const size = 10;
  const data = await getShowList({
    startDate: '20240417',
    endDate: '20240423',
    page: 1,
    size,
  });
  expect(data?.length).toBe(size);
}, 10000);

test('공연 상세 조회', async () => {
  const data = await getShowDetail({
    showId: 'PF239796',
  });
  console.log(data);
  expect(data?.genrenm).toBe('복합');
});

test('박스오피스조회', async () => {
  const data = await getBoxOffice({
    date: '20240423',
    stsType: 'day',
  });
  console.log(data);
});
