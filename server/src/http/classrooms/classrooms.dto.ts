import { PickType, PartialType } from '@nestjs/swagger';
import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

class Classroom {
  @IsUUID()
  @IsString()
  id: string;
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  name: string;
  @IsUUID()
  author: string;
}

export class CreateClassroomDto extends PickType(Classroom, ['name']) {}

export class UpdateClassroomDto extends PartialType(CreateClassroomDto) {}
