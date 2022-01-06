import { KeystoneContext } from "@keystone-6/core/types";

export const getMunicipalityByKey = async (municipalityKey: string, context: KeystoneContext) => {
  const municipality = await context.query.Municipality.findOne({ where: { municipalityKey: municipalityKey } });

  return municipality;
};
