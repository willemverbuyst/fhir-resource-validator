import { z } from "zod";
import { CodeableConcept } from "./Elements/CodeableConcept";
import { ContactPoint } from "./Elements/ContactPoint";
import { DomainResource } from "./Elements/DomainResource";
import { Period } from "./Elements/Period";
import { Reference } from "./Elements/Reference";
import { time } from "./Elements/time";
import { Resources } from "./resources";

export const PractitionerRole = DomainResource.extend({
  resourceType: z.literal(Resources.PractitionerRole),
  identifier: z.array(z.unknown()).optional(),
  active: z.boolean().optional(),
  period: Period.optional(),
  practitioner: Reference(Resources.Practitioner).optional(),
  organization: Reference(Resources.Organization).optional(),
  code: z.array(CodeableConcept).optional(),
  specialty: z.array(CodeableConcept).optional(),
  location: z.array(Reference(Resources.Location)).optional(),
  healtCareService: z.array(Reference(Resources.HealthCareService)).optional(),
  telecom: z.array(ContactPoint).optional(),
  availableTime: z
    .array(
      z.object({
        daysOfWeek: z
          .array(z.enum(["mon", "tue", "wed", "thu", "fri", "sat", "sun"]))
          .optional(),
        allDay: z.boolean().optional(),
        availableStartTime: time.optional(),
        availableEndTime: time.optional(),
      }),
    )
    .optional(),
  notAvailable: z
    .array(
      z.object({
        description: z.string(),
        during: Period.optional(),
      }),
    )
    .optional(),
  availabilityException: z.string().optional(),
  endpoint: z.array(Reference(Resources.Endpoint)).optional(),
}).strict();

export type PractitionerRole = z.infer<typeof PractitionerRole>;
