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
          {detailImgUrls?.styurl.map((item: string) => (
            <ResizedImage key={item} uri={item} width={windowWidth} />
          ))}
        </View>
      )}
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
