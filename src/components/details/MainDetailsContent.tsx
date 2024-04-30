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
  detailImgUrls: ImageUrl | any;
}

const MainDetailsContent = ({detailImgUrls = []}: MainDetailsContentProps) => {
  const windowWidth = Dimensions.get('window').width;

  return (
    <ScrollView
      style={{
        flex: 1,
        width: windowWidth,
        paddingTop: 8,
      }}>
      <Text
        style={{
          padding: 10,
          fontWeight: '600',
          fontSize: 16,
          color: colors.BLACK,
        }}>
        공연내용
      </Text>
      <View>
        {detailImgUrls?.styurl?.length === 0 && (
          <Text>상세이미지가 없습니다.</Text>
        )}

        {detailImgUrls?.styurl?.length >= 1 && (
          <View>
            {detailImgUrls?.styurl?.map((item: string) => (
              <ResizedImage key={item} uri={item} width={windowWidth} />
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

interface ResizedImageProps {
  width: number;
  uri: string;
}

const ResizedImage = ({width, uri}: ResizedImageProps) => {
  const [imageHeight, setImageHeight] = useState<number>();

  return imageHeight ? (
    <FastImage
      resizeMode={FastImage.resizeMode.stretch}
      source={{uri}}
      style={{
        width,
        height: imageHeight,
      }}
    />
  ) : (
    <Image
      onLoad={event => {
        const {width: sourceWidth, height: sourceHeight} =
          event.nativeEvent.source;
        const scaleFactor = sourceWidth / width;
        const scaledImageHeight = sourceHeight / scaleFactor;
        setImageHeight(scaledImageHeight);
      }}
      source={{uri}}
    />
  );
};

const styles = StyleSheet.create({});

export default MainDetailsContent;
