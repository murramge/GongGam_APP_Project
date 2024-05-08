import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {View} from 'react-native';

interface TitleHeaderProps {
  Color?: {
    labelColor?: string;
  };
  label: string | undefined;
}

const TitleHeader = ({
  Color = {
    labelColor: 'black',
  },
  label,
}: TitleHeaderProps) => {
  return (
    <SafeAreaView
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
        alignItems: 'center',
        height: 55,
      }}>
      <View
        style={{justifyContent: 'center', alignItems: 'center', width: '90%'}}>
        <Text
          style={{
            flex: 1,
            fontSize: 16,
            color: Color.labelColor,
            fontWeight: '700',
            textAlign: 'center',
          }}>
          {label}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default TitleHeader;
