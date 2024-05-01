export interface signInputValueProps {
  name: 'email' | 'password' | 'checkPassword' | 'name';
  label: '이메일' | '비밀번호' | '비밀번호 확인' | '닉네임';
  type: 'duplicate' | 'password' | 'default';
}

export interface loginInputValueProps {
  name: 'email' | 'password';
  label: '이메일' | '비밀번호';
  type: 'duplicate' | 'password' | 'default';
}

export const signInputValue: signInputValueProps[] | loginInputValueProps[] = [
  {
    name: 'email',
    label: '이메일',
    type: 'duplicate',
  },
  {
    name: 'password',
    label: '비밀번호',
    type: 'password',
  },
  {
    name: 'checkPassword',
    label: '비밀번호 확인',
    type: 'password',
  },
  {
    name: 'name',
    label: '닉네임',
    type: 'default',
  },
];

export const loginInputValue: loginInputValueProps[] = [
  {
    name: 'email',
    label: '이메일',
    type: 'default',
  },
  {
    name: 'password',
    label: '비밀번호',
    type: 'password',
  },
];

export interface FindPasswordInputProps {
  name: 'email' | 'authnumber';
  label: '이메일' | '인증번호입력';
  type: 'requireAuth' | 'timer' | 'default';
}

export const FindPasswordInput: FindPasswordInputProps[] = [
  {
    name: 'email',
    label: '이메일',
    type: 'requireAuth',
  },
  {
    name: 'authnumber',
    label: '인증번호입력',
    type: 'timer',
  },
];
