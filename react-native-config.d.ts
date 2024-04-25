declare module 'react-native-config' {
  export interface NativeConfig {
    ENV?: string;
    KOPIS_API_KEY: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
