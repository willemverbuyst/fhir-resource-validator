import { z } from "zod";
import { dataTypes } from "../dataTypes";
import { Resources } from "../resources";
import { Coding } from "./Coding";
import { Reference } from "./Reference";

export const Signature = z
  .object({
    type: z.array(Coding),
    when: dataTypes.instant,
    who: Reference([
      Resources.Practitioner,
      Resources.PractitionerRole,
      Resources.RelatedPerson,
      Resources.Patient,
      Resources.Device,
      Resources.Organization,
    ]),
    onBehalfOf: Reference([
      Resources.Practitioner,
      Resources.PractitionerRole,
      Resources.RelatedPerson,
      Resources.Patient,
      Resources.Device,
      Resources.Organization,
    ]).optional(),
    targetFormat: z.string().optional(),
    sigFormat: z.string().optional(),
    data: dataTypes.base64Binary.optional(),
  })
  .strict();
