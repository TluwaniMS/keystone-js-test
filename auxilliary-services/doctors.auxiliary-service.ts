import { Doctor } from "../data-types/doctor.type";
import { KeystoneContext } from "@keystone-6/core/types";

export const prepareDoctorsData = async (context: KeystoneContext, doctors: Doctor[]) => {
  const preparedDoctors: Doctor[] = [];

  const hospitals = await context.query.Hospital.findMany({ query: "id hospitalKey hospitalName" });

  hospitals.forEach((hospital) => {
    const doctorsLinkedToHospital = getDoctorsLinkedToHospital(hospital.hospitalKey, doctors);
    const doctorsWithHospitalLinks = createLinkBetweenDoctorsAndHospitals(doctorsLinkedToHospital, hospital.id);
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
