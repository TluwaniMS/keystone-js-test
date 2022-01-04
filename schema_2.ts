import { list } from "@keystone-6/core";
import { text } from "@keystone-6/core/fields";
import { Lists } from ".keystone/types";

export const lists: Lists = {
  Doctor: list({
    fields: {}
  }),
  Hospital: list({
    fields: {}
  }),
  Municipality: list({
    fields: {}
  })
};
