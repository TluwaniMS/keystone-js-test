import { KeystoneContext } from "@keystone-6/core/types";
import { prepareHospitalsData } from "../auxilliary-services/hospitals.auxiliary-service";
import { Hospitals } from "../seed-data/hospitals.data";

export const createHospitals = async (context: KeystoneContext) => {
  const preparedHospitalData = prepareHospitalsData(Hospitals);
  await context.query.Hospital.createMany({ data: preparedHospitalData });
};
