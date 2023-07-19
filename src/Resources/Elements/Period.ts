import { z } from "zod";
import { dataTypes } from "../dataTypes";

export const Period = z
  .object({
    start: dataTypes.dateTime.optional(),
    end: dataTypes.dateTime.optional(),
  })
  .strict();
