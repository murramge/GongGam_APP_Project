import React from 'react';
import {Alert, Button, StyleSheet, TextInput, View, Text} from 'react-native';
import {Signschema, SignType} from '@utils/validation';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

interface SignUpTemplateProps {}

const SignUpTemplate = ({}: SignUpTemplateProps) => {
  const {control, handleSubmit} = useForm({
    defaultValues: {
      email: '',
      name: '',
      password: '',
      checkPassword: '',
    },
    resolver: zodResolver(Signschema),
  });

  const onSubmit = data => {
    Alert.alert('successful', JSON.stringify(data));
  };

  return (
    <View>
      <Controller
        control={control}
        name={'email'}
        defaultValue={''}
        render={({field: {value, onChange}, fieldState: {error}}) => (
          <>
            <TextInput
              placeholder="email"
              value={value}
              onChangeText={onChange}
            />
            {error && <Text> {error.message}</Text>}
          </>
        )}></Controller>
      <Controller
        control={control}
        name={'name'}
        defaultValue={''}
        render={({field: {value, onChange}}) => (
          <TextInput
            placeholder="name"
            value={value}
            onChangeText={onChange}></TextInput>
        )}></Controller>
      <Controller
        control={control}
        name={'password'}
        defaultValue={''}
        render={({field: {value, onChange}, fieldState: {error}}) => (
          <>
            <TextInput
              placeholder="password"
              value={value}
              onChangeText={onChange}
            />
            {error && <Text> {error.message}</Text>}
          </>
        )}></Controller>
      <Controller
        control={control}
        name={'checkPassword'}
        defaultValue={''}
        render={({field: {value, onChange}, fieldState: {error}}) => (
          <>
            <TextInput
              placeholder="checkPassword"
              value={value}
              onChangeText={onChange}
            />
            {error && <Text> {error.message}</Text>}
          </>
        )}></Controller>
      <Button onPress={handleSubmit(onSubmit)} title="Submit"></Button>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SignUpTemplate;
