import { z } from "zod";
import { Period } from "./Period";

export const HumanName = z
  .object({
    use: z
      .enum([
        "usual",
        "official",
        "temp",
        "nickname",
        "anonymous",
        "old",
        "maiden",
      ])
      .optional(),
    text: z.string().optional(),
    family: z.string().optional(),
    given: z.array(z.string()).optional(),
    prefix: z.array(z.string()).optional(),
    suffix: z.array(z.string()).optional(),
    period: Period.optional(),
  })
  .strict();
