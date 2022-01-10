/*
Welcome to the schema! The schema is the heart of Keystone.

Here we define our 'lists', which will then be used both for the GraphQL
API definition, our database tables, and our Admin UI layout.

Some quick definitions to help out:
A list: A definition of a collection of fields with a name. For the starter
  we have `User`, `Post`, and `Tag` lists.
A field: The individual bits of data on your list, each with its own type.
  you can see some of the lists in what we use below.

*/

// Like the `config` function we use in keystone.ts, we use functions
// for putting in our config so we get useful errors. With typescript,
// we get these even before code runs.
import { list } from "@keystone-6/core";
// We're using some common fields in the starter. Check out https://keystonejs.com/docs/apis/fields#fields-api
// for the full list of fields.
import { text, relationship, password, select, checkbox } from "@keystone-6/core/fields";
// The document field is a more complicated field, so it's in its own package
// Keystone aims to have all the base field types, but you can make your own
// custom ones.
import { document } from "@keystone-6/fields-document";
import { isAdmin } from "./authentication-and-access-control-services/admin.access";
import { isCurrentUser } from "./authentication-and-access-control-services/user.access";
// We are using Typescript, and we want our types experience to be as strict as it can be.
// By providing the Keystone generated `Lists` type to our lists object, we refine
// our types to a stricter subset that is type-aware of other lists in our schema
// that Typescript cannot easily infer.
import { Lists } from ".keystone/types";

// We have a users list, a blogs list, and tags for blog posts, so they can be filtered.
// Each property on the exported object will become the name of a list (a.k.a. the `listKey`),
// with the value being the definition of the list, including the fields.
export const lists: Lists = {
  // Here we define the user list.
  User: list({
    // Here are the fields that `User` will have. We want an email and password so they can log in
    // a name so we can refer to them, and a way to connect users to posts.
    fields: {
      name: text({ validation: { isRequired: true }, access: { update: isCurrentUser } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: "unique",
        isFilterable: true,
        access: { update: isCurrentUser }
      }),
      // The password field takes care of hiding details and hashing values
      password: password({ validation: { isRequired: true }, access: { update: isCurrentUser } }),
      isAdmin: checkbox({ defaultValue: false, access: { read: isAdmin, update: isAdmin } })
    }
  }),
  Doctor: list({
    access: {
      operation: {
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin
      }
    },
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
      hospital: relationship({
        ref: "Hospital.doctors",
        many: false,
        ui: {
          displayMode: "cards",
          cardFields: ["hospitalName", "hospitalKey"],
          inlineConnect: true,
          linkToItem: true
        }
      })
    }
  }),
  Hospital: list({
    access: {
      operation: {
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin
      }
    },
    fields: {
      hospitalName: text({ validation: { isRequired: true } }),
      hospitalKey: text({ validation: { isRequired: true }, isIndexed: "unique" }),
      municipality: relationship({
        ref: "Municipality.hospitals",
        many: false,
        ui: {
          displayMode: "cards",
          cardFields: ["municipalityKey", "municipalityName"],
          inlineConnect: true,
          linkToItem: true
        }
      }),
      doctors: relationship({
        ref: "Doctor.hospital",
        many: true,
        ui: {
          displayMode: "cards",
          cardFields: ["name", "surname", "email", "gender", "specialty"],
          inlineConnect: true,
          linkToItem: true
        }
      })
    },
    ui: {
      listView: {
        initialColumns: ["hospitalName", "hospitalKey"]
      }
    }
  }),
  Municipality: list({
    access: {
      operation: {
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin
      }
    },
    fields: {
      municipalityName: text({ validation: { isRequired: true } }),
      municipalityKey: text({ validation: { isRequired: true }, isIndexed: "unique" }),
      hospitals: relationship({
        ref: "Hospital.municipality",
        many: true,
        ui: {
          displayMode: "cards",
          cardFields: ["hospitalName"]
        }
      })
    },
    ui: {
      listView: {
        initialColumns: ["municipalityName", "municipalityKey"]
      }
    }
  })
};
