import { z } from "zod";

export function Reference(resource: string | string[]) {
  const regex =
    typeof resource === "string"
      ? new RegExp(`^${resource}`)
      : new RegExp(`^${resource.join("|")}`);

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
