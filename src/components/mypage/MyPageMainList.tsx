import useUserMettingsApi from '@pages/MyPage/hooks/useUserMettingsApi';
import {colors} from '@styles/color';
import React, {useCallback} from 'react';
import {StyleSheet, View, Text, FlatList, Image} from 'react-native';
import Config from 'react-native-config';
interface MyPageMainListProps {}

const MyPageMainList = ({}: MyPageMainListProps) => {
  const data = useUserMettingsApi();

  const renderItem = useCallback(({item, index}) => {
    console.log(item);
    return (
      <View style={{padding: 10}}>
        <Image
          style={{width: 60, height: 60, borderRadius: 100}}
          source={{
            uri: `${Config.KOPIS_IMAGE_BASE_URL}/${item.image_url}`,
          }}
        />
        <Text
          style={{width: 60, height: 60, fontSize: 10, padding: 5}}
          numberOfLines={2}>
          {item.perf_name}
        </Text>
      </View>
    );
  }, []);

  return (
    <View
      style={{
        width: '90%',
        height: '100%',
        backgroundColor: colors.WHITE,
        borderWidth: 1,
        borderRadius: 25,
        padding: 16,
        borderColor: colors.GRAY_100,
      }}>
      <Text style={{fontSize: 15, color: colors.BLACK}}>내 모임</Text>
      <View>
        <FlatList
          data={data.mymeetings}
          renderItem={renderItem}
          horizontal={true}></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default MyPageMainList;
