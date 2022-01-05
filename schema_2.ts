import { list } from "@keystone-6/core";
import { relationship, select, text } from "@keystone-6/core/fields";
import { Lists } from ".keystone/types";

export const lists: Lists = {
  Doctor: list({
    fields: {
      name: text({ validation: { isRequired: true } }),
      surname: text({ validation: { isRequired: true } }),
      email: text({ validation: { isRequired: true }, isIndexed: "unique" }),
      gender: select({
        type: "enum",
        options: [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" }
        ]
      }),
      specialty: select({
        type: "enum",
        options: [
          { label: "Pediatrician", value: "pediatrician" },
          { label: "Dematologist", value: "dematologist" },
          { label: "Cardiologist", value: "cardiologist" },
          { label: "Urologist", value: "urologist" },
          { label: "Neurologist", value: "neurologist" },
          { label: "Psychiatrist", value: "psychiatrist" },
          { label: "Radiologist", value: "radiologist" }
        ]
      }),
      hospital: relationship({ ref: "Hospital.doctors", many: false })
    }
  }),
  Hospital: list({
    fields: {
      hospitalName: text({ validation: { isRequired: true } }),
      hospitalKey: text({ validation: { isRequired: true }, isIndexed: true }),
      municipality: relationship({ ref: "Municipality.hospitals", many: false }),
      doctors: relationship({ ref: "Doctor.hospital", many: true })
    }
  }),
  Municipality: list({
    fields: {
      municipalityName: text({ validation: { isRequired: true } }),
      municipalKey: text({ validation: { isRequired: true }, isIndexed: "unique" }),
      hospitals: relationship({ ref: "Hospital.municipality", many: true })
    }
  })
};
