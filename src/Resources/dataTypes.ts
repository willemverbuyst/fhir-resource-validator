import { z } from "zod";

const base64BinaryRegex = /(\s*([0-9a-zA-Z+=]){4}\s*)+/;
const base64Binary = z.string().regex(base64BinaryRegex);

const dateRegex =
  /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1]))?)?/;
const date = z.string().regex(dateRegex);

const dateTimeRegex =
  /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1])(T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00)))?)?)?/;
const dateTime = z.string().regex(dateTimeRegex);

const decimalRegex = /-?(0|[1-9][0-9]*)(\.[0-9]+)?([eE][+-]?[0-9]+)?/;
const decimal = z.string().regex(decimalRegex);

const instantRegex =
  /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))/;
const instant = z.string().regex(instantRegex);

const timeRegex = /([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?/;
const time = z.string().regex(timeRegex);

export const dataTypes = {
  base64Binary,
  date,
  dateTime,
  decimal,
  instant,
  time,
};
