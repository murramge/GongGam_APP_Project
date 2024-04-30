import z from 'zod';

const Signschema = z.object({
  email: z
    .string()
    .min(1, {message: '이메일을 입력해주세요!'})
    .email({message: '이메일 형식을 지켜주세요!'}),
});
