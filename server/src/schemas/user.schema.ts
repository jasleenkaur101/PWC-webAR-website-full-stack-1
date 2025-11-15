import { z } from "zod";

export const UserUpdateSchema = z.object({
  convaiId: z.string().trim().min(1, "convaiId required").optional(),
  rpmAvatarUrl: z.string().trim().url("Must be a valid URL").optional(),
});
