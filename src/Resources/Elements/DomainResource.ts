import { z } from "zod";
import { Narrative } from "./Narrative";
import { Resource } from "./Resource";
import { extension } from "./extension";

export const DomainResource = Resource.extend({
  id: z.string().optional(),
  text: Narrative.optional(),
  contained: Resource.optional(),
  extension: z.array(extension).optional(),
  modifierExtension: z.array(extension).optional(),
}).strict();
