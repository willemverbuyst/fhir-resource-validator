import { z } from "zod";
import { DomainResource } from "./Elements/DomainResource";
import { Resources } from "./resources";

export const Patient = DomainResource.extend({
  resourceType: z.literal(Resources.Patient),
  identifier: z.array(z.unknown()).optional(),
  active: z.boolean(),
}).strict();

export type Patient = z.infer<typeof Patient>;
