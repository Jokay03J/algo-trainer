import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { User as UserPrisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';

export type UserDecorator = {
  id: string;
  user: () => Promise<
    UserPrisma & { existInClassroom: (classroomId: string) => Promise<boolean> }
  >;
};

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    // request.user is set in the AuthGuard
    if (!request.user) throw new UnauthorizedException();

    const user = async () => {
      const user = await (request.prisma as PrismaService).user.findUnique({
        where: { id: request.user.sub },
      });
      const existInClassroom = async (classroomId: string) => {
        const row = await (
          request.prisma as PrismaService
        ).classroomUser.findFirst({
          where: { userId: user.id, classroomId },
        });
        return !!row;
      };
      return { ...user, existInClassroom };
    };

    return {
      id: request.user.sub,
      user,
    };
  },
);
