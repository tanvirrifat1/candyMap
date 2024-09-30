import { z } from 'zod';

export const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    admin: z.object({
      name: z.string({ required_error: 'Name is required' }),
      title: z.string({ required_error: 'Title is required' }),
      body: z.string({ required_error: 'Body is required' }),
      email: z.string({ required_error: 'Email is required' }).email(),
      contactNo: z.string(),
    }),
  }),
});

export const AdminValidationSchema = {
  createAdminValidationSchema,
};
