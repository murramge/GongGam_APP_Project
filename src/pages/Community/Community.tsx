import React, {useCallback, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors} from '@styles/color';
import CommunityTabBar from '@components/community/CommunityTabBar';
import {useAtom, useAtomValue} from 'jotai';
import {CommunityDataAtom} from './hooks/useMeetingApi';
import HorizontalCardList from '@components/common/cardlist/HorizontalCardList';
import CommunityCreate from '../../components/community/CommunityCreate';
import TitleHeader from '@components/common/header/TitleHeader';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@router.d';
import CommunityFilter from './CommunityFilter';
import Modal from 'react-native-modal';
import CommonButton from '@atoms/buttons/CommonButton';
import BackHeader from '@components/common/header/BackHeader';
import {getMeetings} from '@apis/supabase/meeting';
import {PerformanceGenreKey} from '@apis/kopis.d';
import {Text} from 'react-native';
import SearchHeader from '@components/common/header/SearchHeader';

interface CommunityProps extends NativeStackScreenProps<RootStackParamList> {}

const Community = ({}: CommunityProps) => {
  const results = useAtomValue(CommunityDataAtom);

  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  return (
    <>
      <View style={{flex: 1, backgroundColor: colors.WHITE}}>
        <SearchHeader
          title="모임"
          onPressSearch={() => setIsFilterModalVisible(true)}
        />
        <View>
          <CommunityTabBar></CommunityTabBar>
        </View>
        <View>
          <CommunityCreate></CommunityCreate>
        </View>
        <HorizontalCardList data={results} type="community" />
      </View>
      <FilterModal
        isVisible={isFilterModalVisible}
        onPressApply={() => setIsFilterModalVisible(false)}
        onPressBack={() => setIsFilterModalVisible(false)}
      />
    </>
  );
};

const FilterModal = ({
  isVisible,
  onPressBack,
  onPressApply,
}: {
  isVisible: boolean;
  onPressBack: () => void;
  onPressApply: () => void;
}) => {
  const [_, setMeetings] = useAtom(CommunityDataAtom);
  const [perfName, setPerfName] = useState<string>();
  const [perfGenre, setPerfGenre] = useState<PerformanceGenreKey>();
  const [meetingAt, setMeetingAt] = useState<string>();
  const [maxOccupancy, setMaxOccupancy] = useState<number>();

  const handleApply = useCallback(async () => {
    const meetings = await getMeetings({
      perfName,
      perfGenre,
      meetingAt,
      maxOccupancy,
    });
    setMeetings(meetings);
    onPressApply();
  }, [perfName, perfGenre, meetingAt, maxOccupancy, setMeetings, onPressApply]);

  return (
    <Modal
      style={{margin: 0, backgroundColor: colors.WHITE}}
      isVisible={isVisible}>
      <BackHeader label="모임 검색" onPressBack={onPressBack} />
      <CommunityFilter
        {...{
          perfGenre,
          setMaxOccupancy,
          maxOccupancy,
          meetingAt,
          perfName,
          setMeetingAt,
          setPerfGenre,
          setPerfName,
        }}
      />
      <CommonButton label="적용" onPress={handleApply} />
    </Modal>
  );
};

const styles = StyleSheet.create({});

export default Community;
