import z from 'zod';
import {PASSWORD_REGEX} from './regex';

export const Signschema = z
  .object({
    email: z
      .string()
      .min(1, {message: '이메일을 입력해주세요!'})
      .email({message: '이메일 형식을 지켜주세요!'}),
    name: z.string().min(2).max(10),
    password: z.string().regex(PASSWORD_REGEX, '비밀번호 형식을 지켜주세요!'),
    checkPassword: z
      .string()
      .regex(PASSWORD_REGEX, '비밀번호 형식을 지켜주세요!'),
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
  password: z.string().regex(PASSWORD_REGEX, '비밀번호 형식을 지켜주세요!'),
});

export type LoginType = z.infer<typeof Loginschema>;
