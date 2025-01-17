import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import {
  CreateExerciseDto,
  ExercisesParamsDTO,
  ExercisesRessourceParams,
  SubmitExerciseBody,
  UpdateExerciseDto,
} from './exercises.dto';
import { BearerTokenGuard } from 'src/auth/auth.decorators';
import { User, UserDecorator } from 'src/users/users.decorator';

@BearerTokenGuard()
@Controller('exercises')
export class ExercisesController {
  constructor(private service: ExercisesService) {}

  @Get(':classroomId')
  async findAll(
    @User() userDecorator: UserDecorator,
    @Param() params: ExercisesParamsDTO,
  ) {
    return this.service.findAll(userDecorator, params);
  }

  @Post(':classroomId')
  async create(
    @User() userDecorator: UserDecorator,
    @Param() params: ExercisesParamsDTO,
    @Body() data: CreateExerciseDto,
  ) {
    const user = await userDecorator.user();
    return this.service.create(user, params, data);
  }

  @Delete(':classroomId/:id')
  async delete(
    @User() userDecorator: UserDecorator,
    @Param() params: ExercisesRessourceParams,
  ) {
    const user = await userDecorator.user();
    return this.service.delete(user, params);
  }

  @Put(':classroomId/:id')
  async update(
    @User() userDecorator: UserDecorator,
    @Param() params: ExercisesRessourceParams,
    @Body() data: UpdateExerciseDto,
  ) {
    const user = await userDecorator.user();
    return this.service.update(user, params, data);
  }

  @Post(':classroomId/:id/submit')
  async submit(
    @User() userDecorator: UserDecorator,
    @Param() params: ExercisesRessourceParams,
    @Body() data: SubmitExerciseBody,
  ) {
    const user = await userDecorator.user();
    const existInClassroom = await user.existInClassroom(params.classroomId);
    if (!existInClassroom) throw new UnauthorizedException();
    return this.service.submit(params, data);
  }
}
