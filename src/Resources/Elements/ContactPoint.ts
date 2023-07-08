import { z } from "zod";
import { Period } from "./Period";

export const ContactPoint = z
  .object({
    system: z
      .enum(["phone", "fax", "email", "pager", "url", "sms", "other"])
      .optional(),
    value: z.string().optional(),
    use: z.enum(["home", "work", "temp", "old", "mobile"]).optional(),
    rank: z.number().int().optional(),
    period: Period.optional(),
  })
  .strict();
