import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import {
  ChildGrowthHistory,
  ChildGrowthHistorySchema,
} from './schemas/child-growth-history.shema';
import { ChildGrowthHistoriesController } from './child-growth-histories.controller';
import { ChildGrowthHistoriesService } from './child-growth-histories.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ChildGrowthHistory.name, schema: ChildGrowthHistorySchema },
    ]),
  ],
  controllers: [ChildGrowthHistoriesController],
  providers: [ChildGrowthHistoriesService, JwtService, ConfigService],
  exports: [ChildGrowthHistoriesService],
})
export class ChildGrowthHistoriesModule {}
