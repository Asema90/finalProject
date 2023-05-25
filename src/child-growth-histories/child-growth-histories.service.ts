import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateChildGrowthHistoryDto } from './dto/create-child-growth-history.dto';
import { UpdateChildGrowthHistoryDto } from './dto/update-child-growth-history.dto';
import { ChildGrowthHistory } from './schemas/child-growth-history.shema';
import { ChildGrowthHistoryModel } from './child-growth-histories.model';

@Injectable()
export class ChildGrowthHistoriesService {
  constructor(
    @InjectModel(ChildGrowthHistory.name)
    private childGrowthHistoryModel: typeof ChildGrowthHistoryModel,
  ) {}

  async findAll(childId: string, page: number, limit: number) {
    const startIndex = (page - 1) * limit;
    const query = this.childGrowthHistoryModel
      .find({ childId })
      .skip(startIndex)
      .limit(limit);
    const data = await query.exec();
    const total = await this.childGrowthHistoryModel.countDocuments({
      childId,
    });

    return { data, total, page, limit };
  }

  async findOne(id: string) {
    const growthHistory = await this.childGrowthHistoryModel
      .findOne<ChildGrowthHistory>({ _id: id })
      .exec();

    if (!growthHistory)
      throw new NotFoundException('Child Growth History not found');

    return growthHistory;
  }

  async create(
    username: string,
    childId: string,
    createChildGrowthHistoriesDto: CreateChildGrowthHistoryDto,
  ): Promise<ChildGrowthHistory> {
    const newChildGrowthHistories = new this.childGrowthHistoryModel({
      childId,
      parentUsername: username,
      ...createChildGrowthHistoriesDto,
    });
    return newChildGrowthHistories.save();
  }

  async update(
    id: string,
    updateChildGrowthHistoriesDto: UpdateChildGrowthHistoryDto,
  ) {
    return this.childGrowthHistoryModel
      .findOneAndUpdate<ChildGrowthHistory>(
        { _id: id },
        updateChildGrowthHistoriesDto,
        { new: true },
      )
      .exec();
  }

  async remove(id: string) {
    const deletedHistory = await this.childGrowthHistoryModel
      .findOneAndDelete<ChildGrowthHistory>({ _id: id })
      .exec();

    if (!deletedHistory)
      throw new NotFoundException('Child Growth History not found');

    return deletedHistory;
  }
}
