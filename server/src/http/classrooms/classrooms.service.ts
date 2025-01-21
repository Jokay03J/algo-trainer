import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ClassroomsRepository } from './classrooms.repository';
import { User, Roles } from '@prisma/client';
import {
  CreateClassroomDto,
  JoinClassroomDto,
  LeaveClassroomDto,
  UpdateClassroomDto,
} from './classrooms.dto';

@Injectable()
export class ClassroomsService {
  constructor(private repository: ClassroomsRepository) {}

  async create(user: User, data: CreateClassroomDto) {
    return this.repository.create(user, data);
  }

  async findMany(user: User) {
    if (user.role === Roles.STUDENT) {
      return this.repository.findManyStudent(user);
    }
    return this.repository.findManyTeacher(user);
  }

  async findOne(id: string) {
    return this.repository.findOne(id, {
      classroomStudent: {
        include: { user: { select: { id: true, email: true } } },
      },
      exercises: {
        select: { id: true, name: true },
      },
    });
  }

  async update(id: string, user: User, data: UpdateClassroomDto) {
    const classroom = await this.repository.findOne(id);
    if (!classroom) throw new NotFoundException();

    if (classroom.authorId !== user.id) throw new UnauthorizedException();

    return this.repository.update(id, data);
  }

  async delete(id: string, user: User) {
    const classroom = await this.repository.findOne(id);
    if (!classroom) throw new NotFoundException();
    if (classroom.authorId !== user.id || user.role === Roles.STUDENT)
      throw new UnauthorizedException();

    return this.repository.delete(id);
  }

  async join(id: string, user: User, body: JoinClassroomDto) {
    const classroom = await this.repository.findOne(id);
    if (!classroom) throw new NotFoundException();
    if (classroom.authorId !== user.id) throw new UnauthorizedException();
    return await this.repository.join(id, body);
  }

  async leave(params: LeaveClassroomDto, user: User) {
    const classroom = await this.repository.findOne(params.id);
    if (!classroom) throw new NotFoundException();
    if (classroom.authorId !== user.id) throw new UnauthorizedException();
    return await this.repository.leave(params);
  }
}
