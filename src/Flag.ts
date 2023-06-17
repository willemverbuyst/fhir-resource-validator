import { z } from "zod";

export const Flag = z.object({
  resourceType: z.literal("Flag"),
  id: z.string(),
});
