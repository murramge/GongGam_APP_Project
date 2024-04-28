import {
  ScrollView,
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';
import CommonButton from '../../atoms/buttons/CommonButton';
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
  console.log(detailImgUrls);
  console.log(detailImgUrls.styurl.length);
  console.log(detailImgUrls.styurl[0]);
  console.log(detailImgUrls.styurl);
  const urls: [string] = [...detailImgUrls.styurl];

  {
    detailImgUrls.styurl.map((item: string, index: number) => {
      console.log('url=', item);
    });
  }
  console.log('urls=', urls);

  return (
    <ScrollView
      style={{
        flex: 1,
        width: windowWidth,
        paddingTop: 8,
        backgroundColor: colors.MAIN_COLOR, //영역 확인 위해 임시로 설정함
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

      {urls.length > 1 && (
        //map
        <View style={{backgroundColor: '#000'}}>
          <Text>사진이 있습니다.</Text>
          {detailImgUrls?.styurl.map((item: string, index: number) => (
            <View key={index}>
              <Text>{item}</Text>
              <Image source={{uri: item}} style={{width: 300, height: 300}} />
            </View>
          ))}
          {/* <FlatList
              data={detailImgUrls.styurl}
              renderItem={({item}) => (
                <Image source={{uri: item}} style={{width: 300, height: 300}} />
              )}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
            /> */}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default MainDetailsContent;
