import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { Child, ChildSchema } from 'src/children/schemas/child.shema';
import {
  ChildGrowthHistory,
  ChildGrowthHistorySchema,
} from 'src/child-growth-histories/schemas/child-growth-history.shema';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Child.name, schema: ChildSchema },
      { name: ChildGrowthHistory.name, schema: ChildGrowthHistorySchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtService, ConfigService],
  exports: [UsersService],
})
export class UsersModule {}
