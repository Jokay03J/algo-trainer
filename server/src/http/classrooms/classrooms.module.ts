import { Module } from '@nestjs/common';
import { ClassroomsController } from './classrooms.controller';
import { ClassroomsService } from './classrooms.service';
import { ClassroomsRepository } from './classrooms.repository';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Module({
  controllers: [ClassroomsController],
  providers: [ClassroomsService, ClassroomsRepository, PrismaService],
})
export class ClassroomsModule {}
