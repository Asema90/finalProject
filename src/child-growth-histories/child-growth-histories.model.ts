import { model, Model } from 'mongoose';

import {
  ChildGrowthHistoryDocument,
  ChildGrowthHistorySchema,
} from './schemas/child-growth-history.shema';

export const ChildGrowthHistoryModel: Model<ChildGrowthHistoryDocument> =
  model<ChildGrowthHistoryDocument>(
    'ChildGrowthHistory',
    ChildGrowthHistorySchema,
  );
