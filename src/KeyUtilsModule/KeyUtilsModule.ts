import {getKeyHash} from './KeyUtilsModule.d';
import {NativeModules} from 'react-native';
const KeyUtilsModule = NativeModules.KeyUtilsModule;

export const getHashKey: getKeyHash = KeyUtilsModule.getHashKey;
