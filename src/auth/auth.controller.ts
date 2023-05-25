import { Controller, Post, Body } from '@nestjs/common';

import { CreateUserDto } from 'src/users/dto/create-user.dto';

import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   *
   * @param createUserDto
   * @returns Promise string
   */
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  /**
   *
   * @returns Promise string
   */
  @Post('login')
  async login(@Body() { username, password }: LoginUserDto) {
    return this.authService.login(username, password);
  }
}
