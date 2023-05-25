import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from 'src/auth/auth.guard';
import { GetUser } from 'src/decorators/get-user.decorator';
import { ValidateObjectIdPipe } from 'src/pipes/validate-object-id.pipe';
import { User } from 'src/users/schemas/user.schema';

import { ChildGrowthHistoriesService } from './child-growth-histories.service';
import { CreateChildGrowthHistoryDto } from './dto/create-child-growth-history.dto';
import { UpdateChildGrowthHistoryDto } from './dto/update-child-growth-history.dto';

@Controller('child-growth-histories')
export class ChildGrowthHistoriesController {
  constructor(
    private readonly childGrowthHistoriesService: ChildGrowthHistoriesService,
  ) {}

  /**
   *
   * @param childId
   * @param page
   * @param limit
   */
  @UseGuards(AuthGuard)
  @Get()
  async findAll(
    @Query('childId', ValidateObjectIdPipe) childId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.childGrowthHistoriesService.findAll(childId, page, limit);
  }

  /**
   *
   * @param id
   * @returns Promise ChildGrowthHistory
   */
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id', ValidateObjectIdPipe) id: string) {
    return this.childGrowthHistoriesService.findOne(id);
  }

  /**
   *
   * @param childId
   * @param createChildGrowthHistoriesDto
   * @returns Promise ChildGrowthHistories
   */
  @UseGuards(AuthGuard)
  @Post(':childId')
  create(
    @GetUser() user: User,
    @Param('childId', ValidateObjectIdPipe) childId: string,
    @Body() createChildGrowthHistoriesDto: CreateChildGrowthHistoryDto,
  ) {
    return this.childGrowthHistoriesService.create(
      user.username,
      childId,
      createChildGrowthHistoriesDto,
    );
  }

  /**
   *
   * @param childId
   * @param id
   * @param updateChildGrowthHistoriesDto
   * @returns Promise ChildGrowthHistories
   */
  @UseGuards(AuthGuard)
  @Put(':id')
  update(
    @GetUser() user: User,
    @Param('id', ValidateObjectIdPipe) id: string,
    @Body() updateChildGrowthHistoriesDto: UpdateChildGrowthHistoryDto,
  ) {
    return this.childGrowthHistoriesService.update(
      id,
      updateChildGrowthHistoriesDto,
    );
  }

  /**
   *
   * @param childId
   * @param id
   * @returns Promise ChildGrowthHistories
   */
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id', ValidateObjectIdPipe) id: string) {
    return this.childGrowthHistoriesService.remove(id);
  }
}
