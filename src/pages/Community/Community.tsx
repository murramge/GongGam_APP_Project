import React, {createContext, memo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '@styles/color';
import {useAtomValue} from 'jotai';
import useMeetingApi, {CommunityDataAtom} from './hooks/useMeetingApi';
import HorizontalCardList from '@components/common/cardlist/HorizontalCardList';
import CommunityCreate from '../../components/community/CommunityCreate';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@router.d';
import CommunityFilter from './CommunityFilter';
import Modal from 'react-native-modal';
import CommonButton from '@atoms/buttons/CommonButton';
import BackHeader from '@components/common/header/BackHeader';
import SearchHeader from '@components/common/header/SearchHeader';
import CommunityFilterBar from '@components/community/CommunityFilterBar';

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
        <CommunityFilterBar />
        <CommunityCreate />
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

const FilterModal = memo(
  ({
    isVisible,
    onPressBack,
    onPressApply,
  }: {
    isVisible: boolean;
    onPressBack: () => void;
    onPressApply: () => void;
  }) => {
    const {refreshFilteredMeetings} = useMeetingApi({selectedType: 'All'});

    return (
      <Modal
        style={{margin: 0, backgroundColor: colors.WHITE}}
        isVisible={isVisible}>
        <BackHeader label="모임 검색" onPressBack={onPressBack} />
        <CommunityFilter />
        <CommonButton
          label="적용"
          onPress={async () => {
            await refreshFilteredMeetings();
            onPressApply();
          }}
        />
      </Modal>
    );
  },
);

const styles = StyleSheet.create({});

export default Community;
