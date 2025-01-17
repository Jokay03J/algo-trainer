import { ConflictException, Injectable } from '@nestjs/common';
import { SignUpBody } from 'src/auth/auth.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create(data: SignUpBody) {
    if (await this.findOneByEmail(data.email))
      throw new ConflictException('User already exists');
    return this.prisma.user.create({
      data,
    });
  }

  async find(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
