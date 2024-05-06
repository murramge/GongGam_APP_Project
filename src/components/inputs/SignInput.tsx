import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInputFocusEventData,
  NativeSyntheticEvent,
} from 'react-native';
import CommonInput from '../../atoms/inputs/CommonInput';
import {colors} from '@styles/color';
import Entypo from 'react-native-vector-icons/Entypo';
import {FieldError} from 'react-hook-form';

interface SignInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  error?: FieldError;
  type?: string;
}

const SignInput = ({
  label = '아이디',
  value = '',
  onChangeText,
  onBlur,
  error,
  type,
}: SignInputProps) => {
  const [visiable, setVisiable] = useState(true);

  const onPressVisible = () => {
    if (visiable) {
      setVisiable(false);
    } else {
      setVisiable(true);
    }
  };

  return (
    <View
      style={[
        styles.SignInput,
        error
          ? {borderColor: colors.MAIN_COLOR}
          : {borderColor: colors.GRAY_200},
        type == 'editable'
          ? {backgroundColor: colors.GRAY_200}
          : {backgroundColor: colors.WHITE},
      ]}>
      <CommonInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        visiable={type === 'password' ? visiable : false}
        editable={type === 'editable' ? false : true}
      />
      {type === 'password' && (
        <SecurityVisibleButton
          visible={visiable}
          onPressVisible={onPressVisible}
        />
      )}
    </View>
  );
};

const SecurityVisibleButton = ({
  visible,
  onPressVisible,
}: {
  visible: boolean;
  onPressVisible: () => void;
}) => {
  return visible ? (
    <TouchableOpacity
      style={styles.securityVisibleButton}
      onPress={onPressVisible}>
      <Entypo name="eye-with-line" size={16} color={colors.GRAY_500} />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={styles.securityVisibleButton}
      onPress={onPressVisible}>
      <Entypo name="eye" size={16} color={colors.GRAY_500} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  SignInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    margin: 5,
    borderRadius: 20,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  securityVisibleButton: {
    padding: 8,
  },
});

export default SignInput;
