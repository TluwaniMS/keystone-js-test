import { Hospital } from "../data-types/hospital.type";
import { KeystoneContext } from "@keystone-6/core/types";

export const prepareHospitalsData = async (context: KeystoneContext, hospitals: Hospital[]) => {
  const preparedHospitalsData: Hospital[] = [];

  const municipalities = await context.query.Municipality.findMany({ query: "id municipalityName municipalityKey" });

  municipalities.forEach((municipality) => {
    const hospitalsLinkedToMunicipality = getHospitalsLinkedToMunicipality(municipality.municipalityKey, hospitals);
    const hospitalWithMuncipalityLinks = createLinkBetweenHospitalsAndMunicipalities(
      hospitalsLinkedToMunicipality,
      municipality.id
    );

    preparedHospitalsData.push(...hospitalWithMuncipalityLinks);
  });

  return preparedHospitalsData;
};

const getHospitalsLinkedToMunicipality = (municipalityKey: string | any, hospitals: Hospital[]) => {
  const hospitalsLinkedToMunicipality = hospitals.filter((hospital) => hospital.municipality === municipalityKey);

  return hospitalsLinkedToMunicipality;
};

const createLinkBetweenHospitalsAndMunicipalities = (hospitals: Hospital[], municipalityId: string | any) => {
  hospitals.forEach((hospital) => {
    hospital.municipality = { connect: { id: municipalityId } };
  });

  return hospitals;
};
