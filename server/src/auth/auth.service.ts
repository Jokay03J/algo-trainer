import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import { SignInBody, SignUpBody } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private repository: UsersRepository,
    private jwtService: JwtService,
  ) {}
  async signIn(body: SignInBody) {
    const user = await this.repository.findOneByEmail(body.email);

    if (!user) throw new NotFoundException();

    if (await verify(user.password, body.password)) {
      const payload = { sub: user.id };

      return { access_token: await this.jwtService.signAsync(payload), user };
    }

    throw new UnauthorizedException();
  }

  async signUp(body: SignUpBody) {
    const user = await this.repository.create({
      ...body,
      password: await hash(body.password),
    });

    if (!user) throw new NotFoundException();

    const payload = { sub: user.id };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
