import { Hospital } from "../data-types/hospital.type";
import { KeystoneContext } from "@keystone-6/core/types";

export const prepareHospitalsData = (hospitals: Hospital[]) => {
  hospitals.forEach((hospital) => {
    hospital.municipality = { connect: { municipalityKey: hospital.municipality } };
  });

  return hospitals;
};

export const getHospitalByHospitalKey = async (hospitalKey: string, context: KeystoneContext) => {
  const hospital = await context.db.Hospital.findOne({
    where: { hospitalKey: hospitalKey }
  });

  return hospital;
};
