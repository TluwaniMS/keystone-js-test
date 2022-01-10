import { Session } from "../data-types/sesssion.type";

export const isAdmin = ({ session }: { session: Session }) => session?.data.isAdmin;
