import { Hospital } from "../data-types/hospital.type";
import { Municipalities } from "../seed-data/municipalities.data";
import { KeystoneContext } from "@keystone-6/core/types";
import { getMunicipalityByKey } from "./municipalities.auxiliary";

export const prepareHospitalsData = async (context: KeystoneContext, hospitals: Hospital[]) => {
  const preparedHospitalsData: Hospital[] = [];

  Municipalities.forEach(async (municipality) => {
    const currentMunicipality = await getMunicipalityByKey(municipality.municipalityKey, context);
    const hospitalsLinkedToMunicipality = getHospitalsLinkedToMunicipality(municipality.municipalityKey, hospitals);
    const hospitalWithMuncipalityLinks = createLinkBetweenHospitalsAndMunicipalities(
      hospitalsLinkedToMunicipality,
      currentMunicipality.id
    );

    preparedHospitalsData.push(...hospitalWithMuncipalityLinks);
  });

  return preparedHospitalsData;
};

export const getHospitalByHospitalKey = async (hospitalKey: string, context: KeystoneContext) => {
  const hospital = await context.db.Hospital.findOne({
    where: { hospitalKey: hospitalKey }
  });

  return hospital;
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
