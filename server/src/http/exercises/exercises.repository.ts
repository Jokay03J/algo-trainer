import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import {
  CreateExerciseDto,
  ExercisesParamsDTO,
  ExercisesRessourceParams,
  UpdateExerciseDto,
} from './exercises.dto';

@Injectable()
export class ExercisesRepository {
  constructor(private prisma: PrismaService) {}

  async create(params: ExercisesParamsDTO, data: CreateExerciseDto) {
    return this.prisma.exercise.create({
      data: {
        ...data,
        classroom: {
          connect: {
            id: params.classroomId,
          },
        },
      },
    });
  }

  async findAll(params: ExercisesParamsDTO) {
    return this.prisma.exercise.findMany({
      where: {
        classroomId: params.classroomId,
      },
    });
  }

  async findOne(params: ExercisesRessourceParams) {
    return this.prisma.exercise.findFirst({ where: params });
  }

  async delete(params: ExercisesRessourceParams) {
    return this.prisma.exercise.delete({ where: params });
  }

  async update(params: ExercisesRessourceParams, data: UpdateExerciseDto) {
    return this.prisma.exercise.update({
      where: params,
      data,
    });
  }
}
