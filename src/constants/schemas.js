import { schema } from "normalizr";
// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.
const journalSchema = new schema.Entity(
  "journal",
  {},
  {
    idAttribute: journal => journal.id,
  }
);

export const Schemas = {
  JOURNAL: journalSchema,
  JOURNAL_ARRAY: [journalSchema],
};
