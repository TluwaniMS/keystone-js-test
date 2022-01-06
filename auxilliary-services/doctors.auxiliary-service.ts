import { Doctor } from "../data-types/doctor.type";
import { Hospitals } from "../seed-data/hospitals.data";
import { getHospitalByHospitalKey } from "./hospitals.auxiliary-service";
import { KeystoneContext } from "@keystone-6/core/types";

export const prepareDoctorsData = (context: KeystoneContext, doctors: Doctor[]) => {
  const preparedDoctors: Doctor[] = [];

  Hospitals.forEach(async (hospital) => {
    const currentHospital = await getHospitalByHospitalKey(hospital.hospitalKey, context);
    const doctorsLinkedToHospital = getDoctorsLinkedToHospital(hospital.hospitalKey, doctors);
    const doctorsWithHospitalLinks = createLinkBetweenDoctorsAndHospitals(doctorsLinkedToHospital, currentHospital.id);
    preparedDoctors.push(...doctorsWithHospitalLinks);
  });

  return preparedDoctors;
};

const getDoctorsLinkedToHospital = (hospitalKey: string, doctors: Doctor[]) => {
  const doctorsLinkedToHospital = doctors.filter((doctor) => doctor.hospital === hospitalKey);

  return doctorsLinkedToHospital;
};

const createLinkBetweenDoctorsAndHospitals = (doctors: Doctor[], hospitalId: string | any) => {
  doctors.forEach((doctor) => {
    doctor.hospital = { connect: { id: hospitalId } };
  });

  return doctors;
};
