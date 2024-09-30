import { z } from 'zod';

export const createCandyValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    candy: z.object({
      shopName: z.string().nonempty('Shop name is required.'),
      email: z.string().email('Invalid email address.').email(),
      address: z.string().nonempty('Address is required.'),
      lat: z.number().min(-90).max(90, 'Invalid latitude value.'),
      lng: z.number().min(-180).max(180, 'Invalid longitude value.'),
      isDeleted: z.boolean(),
      currentLon: z.object({
        type: z.literal('Point'),
        coordinates: z.tuple([
          z.number().min(-180).max(180, 'Invalid longitude value.'),
          z.number().min(-90).max(90, 'Invalid latitude value.'),
        ]),
      }),
    }),
  }),
});

export const CandyValidationSchema = {
  createCandyValidationSchema,
};
