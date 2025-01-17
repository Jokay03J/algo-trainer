import {
  IsDate,
  IsEmail,
  IsString,
  IsStrongPassword,
  IsUUID,
} from 'class-validator';

export class User {
  @IsUUID()
  @IsString()
  id: string;
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;
  @IsDate()
  createdAt: Date;
  @IsDate()
  updatedAt: Date;
}
