import { Role } from "@app/enum/role.enum";
import { User } from "@user/entity/user.entity";

export interface JwtPayload extends Pick<User, "userName" | "userRole"> {
  sub: string;
  userName: string;
  userRole: [Role];
}
