import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ExercisesRepository } from './exercises.repository';
import {
  CreateExerciseDto,
  ExercisesParamsDTO,
  ExercisesRessourceParams,
  SubmitExerciseBody,
  UpdateExerciseDto,
} from './exercises.dto';
import { User, Roles } from '@prisma/client';
import { UserDecorator } from 'src/users/users.decorator';

@Injectable()
export class ExercisesService {
  constructor(private repository: ExercisesRepository) {}

  async create(
    user: User,
    params: ExercisesParamsDTO,
    data: CreateExerciseDto,
  ) {
    if (user.role !== Roles.TEACHER) throw new UnauthorizedException();
    return this.repository.create(params, data);
  }

  async findAll(userDecorator: UserDecorator, params: ExercisesParamsDTO) {
    const user = await userDecorator.user();
    if (user.role === Roles.STUDENT) {
      const existInClassroom = await user.existInClassroom(params.classroomId);
      if (!existInClassroom) throw new UnauthorizedException();
      return this.repository.findAll(params);
    }
    return this.repository.findAll(params);
  }

  async findOne(params: ExercisesRessourceParams) {
    return this.repository.findOne(params);
  }

  async delete(user: User, params: ExercisesRessourceParams) {
    if (user.role !== Roles.TEACHER) throw new UnauthorizedException();
    return this.repository.delete(params);
  }

  async update(
    user: User,
    params: ExercisesRessourceParams,
    data: UpdateExerciseDto,
  ) {
    if (user.role !== Roles.TEACHER) throw new UnauthorizedException();
    return this.repository.update(params, data);
  }

  async submit(params: ExercisesRessourceParams, data: SubmitExerciseBody) {
    const exercise = await this.repository.findOne(params);
    if (!exercise) throw new NotFoundException();
    return exercise.answer === data.answer;
  }
}
