// member.validation.ts

import { z } from 'zod';
export const memberValidationSchema = z.object({
  body: z.object({
    email: z.string(),
    name: z.string(),
    avatar: z.string(),
  }),
});

  