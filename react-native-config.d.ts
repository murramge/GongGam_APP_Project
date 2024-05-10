declare module 'react-native-config' {
  export interface NativeConfig {
    ENV?: string;
    KOPIS_API_KEY: string;
    SUPABASE_ANON_API_KEY: string;
    KOPIS_IMAGE_BASE_URL: string;
    GOOGLE_OAUTH_CLIENT_ID: string;
    SUPABASE_PUBLIC_IMAGE_BASE_URL: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
