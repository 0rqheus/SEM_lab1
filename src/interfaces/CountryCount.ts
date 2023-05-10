import { z } from 'zod';

export const CountryCountSchema = z.number().max(20)