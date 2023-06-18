import { z } from "zod";
import { Reference } from "./Elements/Reference";
import { Resources } from "./resources";

export const Flag = z
  .object({
    resourceType: z.literal(Resources.Flag),
    status: z.enum(["active", "inactive", "entered-in-error"]),
    subject: Reference(Resources.Patient).optional(),
  })
  .strict();

export type Flag = z.infer<typeof Flag>;
