import React from 'react';
import {StyleSheet, View} from 'react-native';
import CommunityList from '@components/communitySelect/CommunityList';

import {useFormContext} from 'react-hook-form';

const CommunitySelect = () => {
  const {setValue, watch} = useFormContext();

  return (
    <>
      <View style={styles.communityList}>
        <CommunityList setValue={setValue} watch={watch}></CommunityList>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  communityList: {
    flex: 1,
    marginVertical: 5,
  },
});

export default CommunitySelect;
