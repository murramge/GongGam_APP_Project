import type {AreaCodeKey, PerformanceGenreKey} from '@apis/kopis.d';

export interface MainBottomTabParamList {
  Performance: undefined;
  Community: undefined;
  Profile: undefined;
  [key: string]: undefined;
}

export interface RootStackParamList
  extends PerformanceRouteParams,
    CommunityRouteParams,
    ProfileRouteParams,
    AuthenticationRouteParams {
  Splash: undefined;
  MainTab: undefined;
  [key: string]: undefined;
}

interface PerformanceRouteParams {
  Detail: {
    id: string;
  };
  Search: undefined;
  PerformanceSearchResult: {
    date: string;
    performanceName?: string;
    genreCode?: PerformanceGenreKey;
    signguCode?: AreaCodeKey;
  };
  Ticketing: undefined;
}

interface CommunityRouteParams {
  CommunitySelectLayOut: undefined;
  CommunitySelect: undefined;
  CommunitySelectTwoStap: undefined;
  CommunitySelectThreeStap: undefined;
  CommunitySelectFourStap: undefined;
  CommunitySelectFiveStap: undefined;
  CommunitySelectLastStap: undefined;
  CommunityDetail: {
    id: string;
  };
}

interface ProfileRouteParams {
  ProfileEdit: undefined;
  Settings: undefined;
}

interface AuthenticationRouteParams {
  AuthHome:
    | {code: string}
    | {
        error: string;
        error_code: string[];
        error_description: string[];
      }
    | undefined;
  SignUp: undefined;
  Login: undefined;
  NewPasswordPage: {
    code: string;
  };
  FindPasswordPage: undefined;
}
