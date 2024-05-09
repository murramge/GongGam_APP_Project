import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
interface TextButtonProps {
  text: string;
  isSelected?: boolean;
  onPress?: () => void;
}

const TextButton = ({text, isSelected = false, onPress}: TextButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        textButtonStyles.button,
        {
          backgroundColor: isSelected ? '#3544C4' : '#F1F6FF',
        },
      ]}>
      <Text
        style={[
          textButtonStyles.text,
          {
            color: isSelected ? '#fff' : '#35405A',
          },
        ]}
        numberOfLines={1}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const textButtonStyles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
  },
});

export default TextButton;
