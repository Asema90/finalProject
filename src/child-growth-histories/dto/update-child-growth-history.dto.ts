import { PartialType } from '@nestjs/mapped-types';

import { CreateChildGrowthHistoryDto } from './create-child-growth-history.dto';

export class UpdateChildGrowthHistoryDto extends PartialType(
  CreateChildGrowthHistoryDto,
) {}
