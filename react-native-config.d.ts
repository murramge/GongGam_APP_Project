declare module 'react-native-config' {
  export interface NativeConfig {
    ENV?: string;
    KOPIS_API_KEY: string;
    KOPIS_IMAGE_BASE_URL: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
