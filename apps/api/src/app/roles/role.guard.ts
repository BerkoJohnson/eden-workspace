import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES } from "./role.enum";
import { ROLES_KEY } from "./roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {

    const requiredRoles = this.reflector.getAllAndOverride<ROLES[]>(ROLES_KEY,[
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(requiredRoles)

    if(!requiredRoles) {
      return true;
    }


    const {user} = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.role === role);
  }
}
