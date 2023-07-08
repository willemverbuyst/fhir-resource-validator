import { z } from "zod";
import { dateTime } from "./dateTime";

export const Period = z
  .object({
    start: dateTime.optional(),
    end: dateTime.optional(),
  })
  .strict();
