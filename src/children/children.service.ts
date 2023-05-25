import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ChildGrowthHistory } from 'src/child-growth-histories/schemas/child-growth-history.shema';
import { ChildGrowthHistoryModel } from 'src/child-growth-histories/child-growth-histories.model';

import { Child } from './schemas/child.shema';
import { ChildModel } from './children.model';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';

@Injectable()
export class ChildrenService {
  constructor(
    @InjectModel(Child.name) private childModel: typeof ChildModel,
    @InjectModel(ChildGrowthHistory.name)
    private childGrowthHistoryModel: typeof ChildGrowthHistoryModel,
  ) {}

  async findAll(parentUsername: string, page: number, limit: number) {
    const startIndex = (page - 1) * limit;
    const query = this.childModel
      .find({ parentUsername })
      .skip(startIndex)
      .limit(limit);
    const data = await query.exec();
    const total = await this.childModel.countDocuments({ parentUsername });

    return { data, total, page, limit };
  }

  async findOne(parentUsername: string, id: string) {
    const child = await this.childModel
      .findOne<Child>({ parentUsername, _id: id })
      .exec();

    if (!child) throw new NotFoundException('Child not found');

    return child;
  }

  async create(
    parentUsername: string,
    createChildDto: CreateChildDto,
  ): Promise<Child> {
    const createdChild = new this.childModel({
      parentUsername,
      ...createChildDto,
    });

    return createdChild.save();
  }

  async update(id: string, updateChildDto: UpdateChildDto) {
    const child = await this.childModel
      .findByIdAndUpdate<Child>(id, updateChildDto, {
        new: true,
      })
      .exec();

    if (!child) throw new NotFoundException('Child not found');

    return child;
  }

  async remove(id: string) {
    const deletedChild = await this.childModel
      .findByIdAndDelete<Child>(id)
      .exec();

    if (!deletedChild) throw new NotFoundException('Child not found');

    await this.childGrowthHistoryModel.deleteMany({ childId: id }).exec();

    return deletedChild;
  }
}
