import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateClassroomDto, UpdateClassroomDto } from './classrooms.dto';
import { User } from '@prisma/client';

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

  async findOne(id: string) {
    return this.prismaService.classroom.findUnique({
      where: { id },
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
}
