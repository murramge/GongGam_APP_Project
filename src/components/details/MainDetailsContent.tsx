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

  const scrollImages =(detailImgUrl:ImageUrl[]) =>{
    detailImgUrl.styurls.map((item)=>{
      <Image source={{uri:item}} style={{paddingBottom:12}}/>
    })
  }
  return (
    <View>
      <ScrollView
        style={{
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

        {detailImgUrls.styurl.length === 0 && (
          <Text>상세이미지가 없습니다.</Text>
        )}
        {detailImgUrls.styurl.length >= 1 && 
          //map
        }
      </ScrollView>
      <View
        style={{
          backgroundColor: 'transparent',
          //position: 'absolute',
          width: windowWidth,
          left: 0,
          bottom: 0,
          // padding: 16,
        }}>
        <CommonButton label="예매하기" />
        <CommonButton label="같이 볼 사람 모집하기" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default MainDetailsContent;
