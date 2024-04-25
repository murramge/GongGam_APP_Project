import axios from 'axios';
import Config from 'react-native-config';

const KOPIS_BASE_URL = 'http://kopis.or.kr/openApi/restful';

export const kopisInstance = axios.create({
  baseURL: KOPIS_BASE_URL,
  params: {
    newsql: 'Y',
    service: Config.KOPIS_API_KEY,
  },
});
