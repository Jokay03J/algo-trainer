import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import {
  CreateClassroomDto,
  JoinClassroomDto,
  UpdateClassroomDto,
} from './classrooms.dto';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class ClassroomsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(user: User, data: CreateClassroomDto) {
    return this.prismaService.classroom.create({
      data: { ...data, author: { connect: { id: user.id } } },
    });
  }

  async findManyTeacher(user: User) {
    return this.prismaService.classroom.findMany({
      where: { authorId: user.id },
    });
  }

  async findManyStudent(user: User) {
    return this.prismaService.classroomUser.findMany({
      where: { userId: user.id },
      include: { classroom: true },
    });
  }

  async findOne(id: string, include: Prisma.ClassroomInclude = {}) {
    return this.prismaService.classroom.findUnique({
      where: { id },
      include,
    });
  }

  async update(id: string, data: UpdateClassroomDto) {
    return this.prismaService.classroom.update({
      where: { id },
      data: { ...data },
    });
  }

  async delete(id: string) {
    return this.prismaService.classroom.delete({
      where: { id },
    });
  }

  async join(id: string, body: JoinClassroomDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: body.email },
    });
    if (!user) throw new NotFoundException();
    const foundClassroomUser = await this.prismaService.classroomUser.findFirst(
      {
        where: { userId: user.id, classroomId: id },
      },
    );
    if (foundClassroomUser) throw new UnprocessableEntityException();
    return this.prismaService.classroomUser.create({
      data: { userId: user.id, classroomId: id },
    });
  }

  async leave(params: { id: string; joinId: string }) {
    return this.prismaService.classroomUser.delete({
      where: { id: params.joinId },
    });
  }
}
