import { KeystoneContext } from "@keystone-6/core/types";
import { Municipalities } from "../seed-data/municipalities.data";

export const createMunicipalities = async (context: KeystoneContext) => {
  await context.query.Municipality.createMany({ data: Municipalities });
};
