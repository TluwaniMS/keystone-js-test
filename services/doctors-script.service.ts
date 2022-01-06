import { KeystoneContext } from "@keystone-6/core/types";
import { prepareDoctorsData } from "../auxilliary-services/doctors.auxiliary-service";
import { Doctors } from "../seed-data/doctors.data";

export const createDoctors = async (context: KeystoneContext) => {
  const preparedDoctors = await prepareDoctorsData(context, Doctors);
  await context.query.Doctor.createMany({ data: preparedDoctors });
};
