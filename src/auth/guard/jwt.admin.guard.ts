import { AuthGuard } from '@nestjs/passport';

export class JwtAdminGuard extends AuthGuard('admin-jwt') {}
