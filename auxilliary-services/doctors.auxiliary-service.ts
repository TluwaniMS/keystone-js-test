import { Doctor } from "../data-types/doctor.type";

export const prepareDoctorsData = (doctors: Doctor[]) => {
  doctors.forEach((doctor) => {
    doctor.hospital = { connect: { hospitalKey: doctor.hospital } };
  });

  return doctors;
};
