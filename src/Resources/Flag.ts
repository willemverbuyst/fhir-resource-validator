import { z } from "zod";
import { CodeableConcept } from "./Elements/CodeableConcept";
import { DomainResource } from "./Elements/DomainResource";
import { Period } from "./Elements/Period";
import { Reference } from "./Elements/Reference";
import { Resources } from "./resources";

export const Flag = DomainResource.extend({
  resourceType: z.literal(Resources.Flag),
  identifier: z.array(z.unknown()).optional(),
  status: z.enum(["active", "inactive", "entered-in-error"]),
  category: z.array(CodeableConcept).optional(),
  code: CodeableConcept,
  period: Period.optional(),
  subject: Reference([
    Resources.Patient,
    Resources.Location,
    Resources.Group,
    Resources.Organization,
    Resources.Practitioner,
    Resources.PlanDefinition,
    Resources.Medication,
    Resources.Procedure,
  ]),
  encounter: Reference(Resources.Encounter).optional(),
  author: Reference([
    Resources.Device,
    Resources.Organization,
    Resources.Patient,
    Resources.Practitioner,
    Resources.PractitionerRole,
  ]).optional(),
}).strict();

export type Flag = z.infer<typeof Flag>;
