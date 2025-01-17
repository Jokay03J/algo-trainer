import { Module } from '@nestjs/common';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { ExercisesModule } from './exercises/exercises.module';

@Module({
  imports: [ClassroomsModule, ExercisesModule],
  providers: [],
})
export class HttpModule {}
