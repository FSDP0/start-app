import { Role } from "@app/enum/role.enum";

export interface JwtPayload {
  sub: string;
  username: string;
  role: Role;
}
