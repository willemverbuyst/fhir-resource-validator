import { z } from "zod";
import { Resources } from "./resources";

export const Flag = z.object({
  resourceType: z.literal(Resources.Flag),
  id: z.string(),
});

export type Flag = z.infer<typeof Flag>;
