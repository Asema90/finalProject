import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Child } from 'src/children/schemas/child.shema';
import { ChildModel } from 'src/children/children.model';
import { ChildGrowthHistory } from 'src/child-growth-histories/schemas/child-growth-history.shema';
import { ChildGrowthHistoryModel } from 'src/child-growth-histories/child-growth-histories.model';

import { User } from './schemas/user.schema';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserModel } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: typeof UserModel,
    @InjectModel(Child.name)
    private readonly childModel: typeof ChildModel,
    @InjectModel(ChildGrowthHistory.name)
    private childGrowthHistoryModel: typeof ChildGrowthHistoryModel,
  ) {}

  create(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findAll(page: number, limit: number) {
    const startIndex = (page - 1) * limit;
    const query = this.userModel.find().skip(startIndex).limit(limit);

    const data = (await query.exec()).map((user) => {
      const userData = user.toObject();
      delete userData.password;

      return Object.assign(new UserDto(), userData);
    });
    const total = await this.userModel.countDocuments();

    return { data, total, page, limit };
  }

  async findByUsername(username: string) {
    const user = await this.userModel.findOne<User>({ username }).exec();

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async update(username: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel
      .findOneAndUpdate<User>({ username }, updateUserDto, { new: true })
      .exec();

    if (!updatedUser) throw new NotFoundException('User not found');

    return updatedUser;
  }

  async remove(username: string) {
    const deletedUser = await this.userModel
      .findOneAndDelete<User>({ username })
      .exec();

    if (!deletedUser) throw new NotFoundException('User not found');

    await this.childGrowthHistoryModel
      .deleteMany({ parentUsername: username })
      .exec();

    await this.childModel.deleteMany({ parentUsername: username }).exec();

    return deletedUser;
  }
}
