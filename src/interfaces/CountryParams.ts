import { z } from 'zod';

export const CountryParamsSchema = z.object({
  name: z.string().max(25),
  xl: z.number().gte(1).lte(10),
  yl: z.number().gte(1).lte(10),
  xh: z.number().gte(1).lte(10),
  yh: z.number().gte(1).lte(10),
}).strict();

export type CountryParams = z.infer<typeof CountryParamsSchema>;