import {Client} from 'rollbar-react-native';
import Config from 'react-native-config';

export const rollbar = new Client({
  accessToken: Config.ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
});
