import React from 'react';
import {FlatList, View} from 'react-native';

import CommunityItem from '@components/communitySelect/CommunityItem';

import usePerformanceDate from '@hooks/usePerformanceDate';
import usePerformanceApi from '@hooks/usePerformanceApi';
export interface CommunityListProps {
  setValue?: any;
  watch?: any;
}

const CommunityList = ({setValue, watch}: CommunityListProps) => {
  const performanceDate = usePerformanceDate();

  const performanceData = usePerformanceApi(
    performanceDate.today,
    performanceDate.stsType,
  );

  return (
    <View>
      <View>
        <FlatList
          data={performanceData.performances}
          renderItem={({item: art}) => {
            return (
              <CommunityItem
                photoUrl={art.poster ?? undefined}
                title={art.prfnm}
                period={art.prfpd}
                place={art.area}
                cate={art.cate}
                id={art.mt20id}
                setValue={setValue}
                watch={watch}
              />
            );
          }}
          keyExtractor={item => item?.mt20id ?? 'defaultKey'}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default CommunityList;
