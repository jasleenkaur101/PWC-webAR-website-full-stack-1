import { z } from "zod";

export const ItemCreateSchema = z.object({
  name: z.string().min(1),
  notes: z.string().optional()
});

export const ItemUpdateSchema = ItemCreateSchema.partial();
