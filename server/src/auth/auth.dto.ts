import { PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { User } from 'src/users/users.dto';
export class SignInBody extends PickType(User, ['email', 'password']) {
  @IsString()
  password: string;
}
export class SignUpBody extends PickType(User, ['email', 'password']) {}
