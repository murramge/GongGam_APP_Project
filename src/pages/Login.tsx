import React from 'react';
import {StyleSheet, View} from 'react-native';
import SignTemplate from '../template/Sign/SignTemplate';
import FindPassword from '../template/Sign/FindPasswordPage';
import NewPasswordPage from '../template/Sign/NewPasswordPage';
const Login = () => {
  //return <SignTemplate type="login"></SignTemplate>;
  return <FindPassword />;
  //return <NewPasswordPage />;
};

export default Login;
