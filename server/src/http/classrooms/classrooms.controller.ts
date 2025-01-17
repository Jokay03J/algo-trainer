import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { User, UserDecorator } from 'src/users/users.decorator';
import { CreateClassroomDto, UpdateClassroomDto } from './classrooms.dto';
import { BearerTokenGuard } from 'src/auth/auth.decorators';
import { RessourceParams } from 'src/common/ressource-params.dto';
import { ApiResponse } from '@nestjs/swagger';

@BearerTokenGuard()
@Controller('classrooms')
export class ClassroomsController {
  constructor(private service: ClassroomsService) {}

  @Get()
  async findMany(@User() userDecorator: UserDecorator) {
    const user = await userDecorator.user();
    return this.service.findMany(user);
  }

  @Get(':id')
  async findOne(@Param() params: RessourceParams) {
    return this.service.findOne(params.id);
  }

  @Post()
  async create(
    @User() userDecorator: UserDecorator,
    @Body() body: CreateClassroomDto,
  ) {
    const user = await userDecorator.user();
    return this.service.create(user, body);
  }

  @Put(':id')
  async update(
    @Param() params: RessourceParams,
    @User() userDecorator: UserDecorator,
    @Body() body: UpdateClassroomDto,
  ) {
    const user = await userDecorator.user();
    return this.service.update(params.id, user, body);
  }

  @ApiResponse({ status: 204 })
  @Delete(':id')
  @HttpCode(204)
  async delete(
    @Param() params: RessourceParams,
    @User() userDecorator: UserDecorator,
  ) {
    const user = await userDecorator.user();
    return this.service.delete(params.id, user);
  }
}
