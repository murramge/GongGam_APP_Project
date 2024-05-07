import z from 'zod';
import {PASSWORD_REGEX} from './regex';

const emailSchema = z
  .string()
  .min(1, {message: '이메일을 입력해주세요!'})
  .email({message: '이메일 형식을 지켜주세요!'});
const passwordSchema = z
  .string()
  .regex(PASSWORD_REGEX, '비밀번호: 9-20자, 영문+특수문자 필수');

export const Signschema = z
  .object({
    email: z
      .string()
      .min(1, {message: '이메일을 입력해주세요!'})
      .email({message: '이메일 형식을 지켜주세요!'}),
    name: z
      .string()
      .min(2, {message: '닉네임을 2자 이상 입력해주세요!'})
      .max(10, {message: '닉네임을 10자 이하로 입력해주세요!'}),
    password: z
      .string()
      .regex(PASSWORD_REGEX, '비밀번호: 9-20자, 영문+특수문자 필수'),
    checkPassword: z
      .string()
      .regex(PASSWORD_REGEX, '비밀번호: 9-20자, 영문+특수문자 필수'),
  })
  .superRefine(({checkPassword, password}, ctx) => {
    if (checkPassword !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '비밀번호가 일치하지 않습니다.',
        path: ['checkPassword'],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '비밀번호가 일치하지 않습니다.',
        path: ['password'],
      });
    }
  });

export type SignType = z.infer<typeof Signschema>;

export const Loginschema = z.object({
  email: z
    .string()
    .min(1, {message: '이메일을 입력해주세요!'})
    .email({message: '이메일 형식을 지켜주세요!'}),
  password: z
    .string()
    .regex(PASSWORD_REGEX, '비밀번호: 9-20자, 영문+특수문자 필수'),
});

export type LoginType = z.infer<typeof Loginschema>;

export const PasswordResetEmailSchema = z.object({email: emailSchema});
export type PasswordResetEmailType = z.infer<typeof PasswordResetEmailSchema>;

export const PasswordResetSchema = z
  .object({
    password: passwordSchema,
    passwordCheck: z.string(),
  })
  .superRefine(({passwordCheck, password}, ctx) => {
    console.log('password', password);
    console.log('passwordCheck', passwordCheck);
    if (passwordCheck !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '비밀번호가 일치하지 않습니다.',
        path: ['checkPassword'],
      });
    }
  });
export type PasswordResetType = z.infer<typeof PasswordResetSchema>;
