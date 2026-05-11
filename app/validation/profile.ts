import { z } from 'zod'

export const profileSchema = z.object({
  name: z
    .string('Имя должно содержать только буквы')
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(50, 'Имя слишком длинное'),
  // username: z
  //   .string('Username может содержать только буквы, цифры и "_')
  //   .min(3, 'Username должен содержать минимум 3 символа')
  //   .max(30, 'Username слишком длинный')
  //   .regex(/^[a-zA-Z0-9_]+$/, 'Username может содержать только буквы, цифры и "_"'),

  // phone: z.string('Введите корректный номер телефона').min(6, 'Введите корректный номер телефона'),
  avatar: z.string().optional(),
})

export type ProfileForm = z.infer<typeof profileSchema>
