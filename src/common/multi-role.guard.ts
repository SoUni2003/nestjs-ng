import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

type UserWithRole = {
  role: string;
};

@Injectable()
export class MultiRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!allowedRoles) {
      return true;
    }
    const request: { user: UserWithRole } = context.switchToHttp().getRequest();
    const user = request.user;
    return !!(user && user.role && allowedRoles.includes(user.role));
  }
}
