import { model, Model } from 'mongoose';

import { ChildDocument, ChildSchema } from './schemas/child.shema';

export const ChildModel: Model<ChildDocument> = model<ChildDocument>(
  'Child',
  ChildSchema,
);
