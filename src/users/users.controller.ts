import {
  Controller,
  Get,
  Body,
  Query,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';

import { AuthGuard } from 'src/auth/auth.guard';
import { GetUser } from 'src/decorators/get-user.decorator';

import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  /**
   *
   * @param user
   * @returns Promise User
   */
  @UseGuards(AuthGuard)
  @Get('me')
  async getCurrentUserProfile(@GetUser() user: User) {
    return this.userService.findByUsername(user.username);
  }

  /**
   *
   * @param page
   * @param limit
   */
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.userService.findAll(page, limit);
  }

  /**
   *
   * @param user
   * @param updateUserDto
   * @returns Promise User
   */
  @UseGuards(AuthGuard)
  @Put()
  update(@GetUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(user.username, updateUserDto);
  }

  /**
   *
   * @param user
   * @returns Promise User
   */
  @UseGuards(AuthGuard)
  @Delete()
  remove(@GetUser() user: User) {
    return this.userService.remove(user.username);
  }
}
