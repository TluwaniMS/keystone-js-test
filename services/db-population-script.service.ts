import { createDoctors } from "./doctors-script.service";
import { createHospitals } from "./hospitals-script.service";
import { createMunicipalities } from "./municipalities-script.service";
import { KeystoneContext } from "@keystone-6/core/types";

export const populateDataBaseWithSampleData = async (context: KeystoneContext) => {
  console.log("Starting process of populating database... 🌱");
  await createMunicipalities(context);
  await createHospitals(context);
  await createDoctors(context);
  console.log("Database population script ran succesfully... ✅");
  process.exit();
};
