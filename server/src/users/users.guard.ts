import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BaseAuthGuard } from 'src/common/baseAuthGuard';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class MustTeacher extends BaseAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'eee',
      });
      const user = await this.prismaService.user.findUnique({
        where: {
          id: payload.sub,
        },
      });
      if (user.role === 'TEACHER') return true;
      throw new UnauthorizedException();
    } catch {
      throw new UnauthorizedException();
    }
    return false;
  }
}
