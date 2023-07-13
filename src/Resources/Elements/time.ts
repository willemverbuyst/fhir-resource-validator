import { z } from "zod";

const timeRegex = /([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?/;

export const time = z.string().regex(timeRegex);
