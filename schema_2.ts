import { list } from "@keystone-6/core";
import { select, text } from "@keystone-6/core/fields";
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
          { label: "", value: "" },
          { label: "", value: "" }
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
      hospital: select({
        type: "enum",
        options: [
          {
            label: "Sekhukhune Private Hospital",
            value: "SKKN"
          },
          {
            label: "Shapo Private Hospital",
            value: "SHPO"
          },
          {
            label: "Polokwane Hospital",
            value: "PLKH"
          },
          {
            label: "Botlokwa Hospital",
            value: "BTLK"
          },
          {
            label: "Marobjyane Private Hospital",
            value: "MRBJ"
          },
          {
            label: "Ntsundeni Private Hospital",
            value: "NTNP"
          },
          {
            label: "Moshe Hospital",
            value: "MSHH"
          },
          {
            label: "Marabastad Hospital",
            value: "MRSB"
          },
          {
            label: "Baloyi Hospital",
            value: "BLYH"
          },
          {
            label: "Vhatwanamba Private Health Care",
            value: "VTPH"
          },
          {
            label: "Bulombo Hospital",
            value: "BLMH"
          },
          {
            label: "Mashashane Hospital",
            value: "MSSH"
          },
          {
            label: "dendron Health Centre",
            value: "DNDH"
          }
        ]
      })
    }
  }),
  Hospital: list({
    fields: {
      hospitalName: text({ validation: { isRequired: true } })
    }
  }),
  Municipality: list({
    fields: {
      municipalityName: text({ validation: { isRequired: true } })
    }
  })
};
