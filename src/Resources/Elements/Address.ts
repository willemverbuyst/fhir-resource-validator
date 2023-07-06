import { z } from "zod";
import { Period } from "./Period";

export const Address = z
  .object({
    use: z.enum(["home", "work", "temp", "old", "billing"]).optional(),
    type: z.enum(["postal", "physical", "both"]).optional(),
    text: z.string().optional(),
    line: z.array(z.string()).optional(),
    city: z.string().optional(),
    district: z.string().optional(),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
    period: Period.optional(),
  })
  .strict();
