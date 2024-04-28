export interface EmailCredentials {
  email: string;
  password: string;
}

export interface EmailSignUp extends EmailCredentials {
  nickname: string;
}
