import { Session } from "../data-types/sesssion.type";
import { User } from "../data-types/user.type";

export const isCurrentUser = ({ session, item }: { session: Session; item: User | any }) =>
  session?.data.id === item.id;
