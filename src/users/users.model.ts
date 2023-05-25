import { model, Model } from 'mongoose';

import { UserDocument, UserSchema } from './schemas/user.schema';

export const UserModel: Model<UserDocument> = model<UserDocument>(
  'User',
  UserSchema,
);
