import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import {
  ChildGrowthHistory,
  ChildGrowthHistorySchema,
} from 'src/child-growth-histories/schemas/child-growth-history.shema';

import { ChildrenService } from './children.service';
import { ChildrenController } from './children.controller';
import { Child, ChildSchema } from './schemas/child.shema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Child.name, schema: ChildSchema },
      {
        name: ChildGrowthHistory.name,
        schema: ChildGrowthHistorySchema,
      },
    ]),
  ],
  controllers: [ChildrenController],
  providers: [ChildrenService, JwtService, ConfigService],
  exports: [ChildrenService],
})
export class ChildrenModule {}
