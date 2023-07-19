import { z } from "zod";
import { dataTypes } from "../dataTypes";

export const Attachment = z
  .object({
    contentType: z.unknown().optional(),
    language: z.unknown().optional(),
    data: z.unknown().optional(),
    url: z.unknown().optional(),
    size: z.unknown().optional(),
    hash: z.unknown().optional(),
    title: z.string().optional(),
    creation: dataTypes.dateTime.optional(),
  })
  .strict();
