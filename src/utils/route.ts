import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@router.d';

export function popToSpecificRoute(
  navigation: NativeStackNavigationProp<RootStackParamList>,
  routeName: keyof RootStackParamList,
) {
  const routes = navigation.getState().routes;
  const lastIndex = routes.length - 1;
  let cuurentRouteIndex = lastIndex;
  while (cuurentRouteIndex >= 0) {
    if (routes[cuurentRouteIndex].name === routeName) {
      navigation.pop(lastIndex - cuurentRouteIndex);
      return true;
    }
    cuurentRouteIndex--;
  }

  return false;
}
