import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<AuthDto> {
    const { username, password } = createUserDto;

    try {
      if (!username || !password)
        throw new BadRequestException('Username and password are required');

      await this.userService.findByUsername(username);

      throw new ConflictException('Username is already taken');
    } catch (error) {
      if (error instanceof NotFoundException) {
        const hashedPassword = await hash(password, 5);
        const userWithHashedPassword: CreateUserDto = {
          ...createUserDto,
          password: hashedPassword,
        };

        const createdUser = await this.userService.create(
          userWithHashedPassword,
        );

        return {
          token: this.jwtService.sign({ username: createdUser.username }),
        };
      }

      throw error;
    }
  }

  async login(username: string, password: string): Promise<AuthDto> {
    try {
      if (!username || !password) {
        throw new BadRequestException('Username and password are required');
      }

      const user = await this.userService.findByUsername(username);

      if (!user)
        throw new UnauthorizedException('Invalid username or password');

      const isValidPassword = await this.comparePasswords(
        password,
        user.password,
      );

      if (!isValidPassword)
        throw new UnauthorizedException('Invalid username or password');

      return { token: this.jwtService.sign({ username: user.username }) };
    } catch (error) {
      throw error;
    }
  }

  async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return compare(plainPassword, hashedPassword);
  }
}
