import { z } from "zod";

export function Reference(resource: string) {
  const regex = new RegExp(`^${resource}`);
  const Reference = z
    .object({
      reference: z.string().regex(regex).optional(),
      type: z.string().optional(),
      indetifier: z.unknown().optional(),
      display: z.string().optional(),
    })
    .strict();

  return Reference;
}
