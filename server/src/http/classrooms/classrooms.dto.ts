import { PickType, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { RessourceParams } from 'src/common/ressource-params.dto';

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

export class JoinClassroomDto {
  @IsEmail()
  email: string;
}

export class LeaveClassroomDto extends PickType(RessourceParams, ['id']) {
  @IsUUID()
  joinId: string;
}
