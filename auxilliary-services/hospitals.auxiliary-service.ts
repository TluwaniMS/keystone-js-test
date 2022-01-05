import { Hospital } from "../data-types/hospital.type";

export const prepareHospitalsData = (hospitals: Hospital[]) => {
  hospitals.forEach((hospital) => {
    hospital.municipality = { connect: { municipalityKey: hospital.municipality } };
  });

  return hospitals;
};
