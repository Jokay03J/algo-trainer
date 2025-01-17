import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { ExercisesRepository } from './exercises.repository';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Module({
  providers: [ExercisesService, ExercisesRepository, PrismaService],
  controllers: [ExercisesController],
})
export class ExercisesModule {}
