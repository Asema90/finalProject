import {
  Controller,
  Get,
  Query,
  Param,
  Body,
  UseGuards,
  Delete,
  Post,
  Put,
} from '@nestjs/common';

import { AuthGuard } from 'src/auth/auth.guard';
import { ValidateObjectIdPipe } from 'src/pipes/validate-object-id.pipe';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/users/schemas/user.schema';

import { ChildrenService } from './children.service';
import { UpdateChildDto } from './dto/update-child.dto';
import { CreateChildDto } from './dto/create-child.dto';

@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  /**
   *
   * @param user
   * @param page
   * @param limit
   */
  @UseGuards(AuthGuard)
  @Get()
  async findAll(
    @GetUser() user: User,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.childrenService.findAll(user.username, page, limit);
  }

  /**
   *
   * @param id
   * @param user
   * @returns Promise Child
   */
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(
    @Param('id', ValidateObjectIdPipe) id: string,
    @GetUser() user: User,
  ) {
    return this.childrenService.findOne(user.username, id);
  }

  /**
   *
   * @param username
   * @param createChildDto
   * @returns Promise Child
   */
  @UseGuards(AuthGuard)
  @Post()
  async create(@GetUser() user: User, @Body() createChildDto: CreateChildDto) {
    return this.childrenService.create(user.username, createChildDto);
  }

  /**
   *
   * @param id
   * @param updateChildDto
   * @returns Promise Child
   */
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id', ValidateObjectIdPipe) id: string,
    @Body() updateChildDto: UpdateChildDto,
  ) {
    return this.childrenService.update(id, updateChildDto);
  }

  /**
   *
   * @param id
   * @returns Promise Child
   */
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id', ValidateObjectIdPipe) id: string) {
    return this.childrenService.remove(id);
  }
}
