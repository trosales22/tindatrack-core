import { STATUSES, STORE_TYPES } from 'utils/businessData';
import { z } from 'zod';

export const businessSchema = z.object({
  name: z.string().nonempty('Business Name is required'),
  type: z.enum([
    STORE_TYPES.RETAIL,
    STORE_TYPES.FOOD_STALL,
    STORE_TYPES.EATERY,
    STORE_TYPES.GROCERY,
    STORE_TYPES.KIOSK,
    STORE_TYPES.MARKET_VENDOR,
    STORE_TYPES.OTHER,
  ]),
  status: z.enum([STATUSES.ACTIVE, STATUSES.INACTIVE]),
});

export type BusinessFormData = z.infer<typeof businessSchema>;
