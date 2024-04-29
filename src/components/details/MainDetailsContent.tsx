import {
  ScrollView,
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '@styles/color';
interface ImageUrl {
  styurl: string[];
}

interface MainDetailsContentProps {
  id: string;
  detailImgUrls: ImageUrl[];
}

const MainDetailsContent = ({
  id,
  detailImgUrls = [],
}: MainDetailsContentProps) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  //const imageHeight = (windowWidth / imageSize.width) * imageSize.height;

  return (
    <ScrollView
      style={{
        flex: 1,
        width: windowWidth,
        paddingTop: 8,
      }}>
      <Text
        style={{
          paddingLeft: 18,
          paddingBottom: 8,
          fontWeight: '600',
          fontSize: 16,
          color: colors.Black,
        }}>
        공연내용
      </Text>

      {detailImgUrls.styurl.length === 0 && <Text>상세이미지가 없습니다.</Text>}

      {detailImgUrls.styurl.length >= 1 && (
        <View>
          {detailImgUrls?.styurl.map((item: string, index: number) => (
            <View
              key={index}
              style={{flex: 1, paddingBottom: 16, alignItems: 'center'}}>
              <Image
                source={{uri: item}}
                style={{
                  width: windowWidth - 40,
                  aspectRatio: 1 / 1,
                }}
              />
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default MainDetailsContent;
