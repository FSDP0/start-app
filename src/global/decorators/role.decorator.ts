import { Role } from "@app/enum/role.enum";
import { SetMetadata } from "@nestjs/common";
import { DECORATOR_CONSTANTS } from "@app/constants/decorator.constant";

const {
  ROLE: { ROLES_KEY }
} = DECORATOR_CONSTANTS;

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
