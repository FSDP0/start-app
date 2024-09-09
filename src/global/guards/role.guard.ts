import { DECORATOR_CONSTANTS } from "@app/constants/decorator.constant";
import { Role } from "@app/enum/role.enum";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { User } from "@user/entity/user.entity";

const {
  ROLE: { ROLES_KEY }
} = DECORATOR_CONSTANTS;

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (!requiredRoles) {
      return true;
    }

    const user: User = context.switchToHttp().getRequest()["user"];

    return requiredRoles.some((role) => user.userRole.includes(role));
  }
}
