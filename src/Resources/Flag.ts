import { z } from "zod";
import { DomainResource } from "./Elements/DomainResource";
import { Narrative } from "./Elements/Narrative";
import { Period } from "./Elements/Period";
import { Reference } from "./Elements/Reference";
import { Resources } from "./resources";

export const Flag = DomainResource.extend({
  resourceType: z.literal(Resources.Flag),
  id: z.string().optional(),
  text: Narrative.optional(),
  identifier: z.unknown().optional(),
  status: z.enum(["active", "inactive", "entered-in-error"]),
  category: z.unknown().optional(),
  code: z.unknown().optional(),
  period: Period.optional(),
  subject: Reference(Resources.Patient).optional(),
  encounter: Reference(Resources.Encounter).optional(),
}).strict();

export type Flag = z.infer<typeof Flag>;
