import type {AreaCodeKey, PerformanceGenreKey} from '@apis/kopis.d';
import {CommunityEditForm} from '@pages/CommunitySelect/CommunitySelectLayOut';

export type MainBottomTabParamList = {
  Performance: undefined;
  Community: undefined;
  Profile: undefined;
};

export type RootStackParamList = PerformanceRouteParams &
  CommunityRouteParams &
  ProfileRouteParams &
  AuthenticationRouteParams & {
    Splash: undefined;
    MainTab: undefined;
  };

type PerformanceRouteParams = {
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
};

type CommunityRouteParams = {
  CommunitySelectLayOut:
    | undefined
    | {
        artId: string;
      }
    | {meetingId: number};
  CommunitySelect: undefined;
  CommunitySelectTwoStap: undefined;
  CommunitySelectThreeStap: undefined;
  CommunitySelectFourStap: undefined;
  CommunitySelectFiveStap: undefined;
  CommunitySelectLastStap: undefined;
  CommunityDetail: {
    id: number;
  };
};

type ProfileRouteParams = {
  ProfileEdit: undefined;
  Settings: undefined;
};

type AuthenticationRouteParams = {
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
    access_token: string;
    refresh_token: string;
  };
  FindPasswordPage: undefined;
  OnBoarding: undefined;
};
