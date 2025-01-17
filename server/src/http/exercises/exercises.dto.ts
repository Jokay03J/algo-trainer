import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { AvailableLanguage } from '@/shared/types/AvailableLanguage';
import { PickType, PartialType } from '@nestjs/swagger';

export class CreateExerciseDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;
  @IsString()
  instruction: string;
  @IsString()
  answer: string;
  @IsString()
  defaultCode: string;
  @IsString()
  language: AvailableLanguage;
}

export class UpdateExerciseDto extends PartialType(
  PickType(CreateExerciseDto, ['name', 'instruction', 'answer', 'defaultCode']),
) {}

export class SubmitExerciseBody extends PickType(CreateExerciseDto, [
  'answer',
]) {}

export class ExercisesRessourceParams {
  @IsString()
  @IsUUID()
  classroomId: string;

  @IsString()
  @IsUUID()
  id: string;
}

export class ExercisesParamsDTO {
  @IsString()
  @IsUUID()
  classroomId: string;
}
