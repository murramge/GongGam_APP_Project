import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '@styles/color';
import FastImage from 'react-native-fast-image';
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
  const [imageHeightList, setImageHeightList] = useState<number[]>([]);

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
            <View key={index} style={{flex: 1, alignItems: 'center'}}>
              <Image
                onLoad={event => {
                  const {width, height} = event.nativeEvent.source;
                  const scaleFactor = width / windowWidth;
                  const imageHeight = height / scaleFactor;
                  setImageHeightList(prevState => {
                    const newImageHeightList = [...prevState];
                    newImageHeightList[index] = imageHeight;
                    return newImageHeightList;
                  });
                }}
                source={{uri: item}}
              />
              {imageHeightList[index] && (
                <FastImage
                  resizeMode={FastImage.resizeMode.stretch}
                  source={{uri: item}}
                  style={{
                    width: windowWidth,
                    height: imageHeightList[index],
                  }}
                />
              )}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default MainDetailsContent;
