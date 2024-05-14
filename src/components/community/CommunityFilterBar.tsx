import RecentButton from '@atoms/buttons/RecentButton';
import useMeetingApi from '@pages/Community/hooks/useMeetingApi';
import dayjs from 'dayjs';
import React, {memo} from 'react';
import {ScrollView, View} from 'react-native';

interface CommunityFilterBarProps {}

const CommunityFilterBar = ({}: CommunityFilterBarProps) => {
  const {maxOccupancy, meetingAt, perfGenre, perfName} = useMeetingApi({
    selectedType: 'All',
  });
  if (!maxOccupancy && !meetingAt && !perfGenre && !perfName) return <></>;

  return (
    <View style={{width: '100%', height: 48}}>
      <ScrollView
        style={{
          flex: 1,
          marginBottom: 16,
          marginHorizontal: 16,
        }}
        contentContainerStyle={{
          gap: 16,
        }}
        showsHorizontalScrollIndicator={false}
        horizontal>
        {[
          perfName && `공연명: ${perfName}`,
          meetingAt && `모임일: ${dayjs(meetingAt).format('YYYY년 MM월 DD일')}`,
          perfGenre && `장르: ${perfGenre}`,
          maxOccupancy && `최대 인원: ${maxOccupancy}`,
        ].map(
          (label, index) => label && <RecentButton key={index} label={label} />,
        )}
      </ScrollView>
    </View>
  );
};

export default memo(CommunityFilterBar);
