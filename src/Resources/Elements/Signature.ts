import { z } from "zod";
import { Resources } from "../resources";
import { Coding } from "./Coding";
import { Reference } from "./Reference";
import { base64Binary } from "./base64Binary";
import { instant } from "./instant";

export const Signature = z
  .object({
    type: z.array(Coding),
    when: instant,
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
    data: base64Binary.optional(),
  })
  .strict();
