import { Body, Controller, Post } from '@nestjs/common';
import { SignInBody, SignUpBody } from './auth.dto';
import { AuthService } from './auth.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('/login')
  @ApiResponse({ status: 404 })
  async login(@Body() data: SignInBody) {
    return this.service.signIn(data);
  }

  @Post('/register')
  @ApiResponse({ status: 409 })
  async register(@Body() data: SignUpBody) {
    return this.service.signUp(data);
  }
}
