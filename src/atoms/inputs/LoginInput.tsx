import {colors} from '@styles/color';
import {mergeRefs} from '@utils/login';
import React, {ForwardedRef, ReactNode, forwardRef, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  View,
  TextInputProps,
  Text,
  Pressable,
} from 'react-native';

interface InputFieldProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
  icon?: ReactNode;
  confirm?: string;
}

const deviceHeight = Dimensions.get('screen').height;

const InputField = forwardRef(
  (
    {
      disabled = false,
      error,
      touched,
      icon = null,
      confirm,
      ...props
    }: InputFieldProps,
    ref?: ForwardedRef<TextInput>,
  ) => {
    const innerRef = useRef<TextInput | null>(null);

    const handlePressInput = () => {
      innerRef.current?.focus();
    };

    return (
      <Pressable onPress={handlePressInput}>
        <View
          style={[
            styles.container,
            disabled && styles.disabled,
            props.multiline && styles.multiline,
            touched && Boolean(error) && styles.inputError,
          ]}>
          <View
            style={
              (Boolean(icon) && styles.innerContainer) ||
              (Boolean(confirm) && styles.innerContainer)
            }>
            <TextInput
              ref={ref ? mergeRefs(innerRef, ref) : innerRef}
              editable={!disabled}
              placeholderTextColor={colors.GRAY_300}
              style={[styles.input, disabled && styles.disabled]}
              autoCapitalize="none"
              spellCheck={false}
              autoCorrect={false}
              {...props}
            />
            {Boolean(icon) && <View>{icon}</View>}
            {Boolean(confirm) && <Text style={styles.confirm}>{confirm}</Text>}
          </View>
          {touched && Boolean(error) && (
            <Text style={styles.error}>{error}</Text>
          )}
        </View>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.MAIN_COLOR,
    padding: deviceHeight > 700 ? 15 : 10,
    borderRadius: 50,
    marginBottom: 15,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
  },
  multiline: {
    paddingBottom: deviceHeight > 700 ? 45 : 30,
  },
  input: {
    fontSize: 16,
    color: colors.BLACK,
    padding: 0,
  },
  disabled: {
    borderColor: colors.GRAY_200,
    color: colors.GRAY_500,
  },
  inputError: {
    borderWidth: 1,
    borderColor: colors.MAIN_COLOR,
  },
  error: {
    color: colors.RED_500,
    fontSize: 12,
    paddingTop: 5,
  },
  confirm: {
    color: colors.MAIN_COLOR,
    fontSize: 12,
  },
});

export default InputField;
