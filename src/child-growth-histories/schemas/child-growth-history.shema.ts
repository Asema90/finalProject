import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class ChildGrowthHistory {
  @Prop({ type: Types.ObjectId })
  childId?: Types.ObjectId;

  @Prop()
  parentUsername?: string;

  @Prop({ required: true })
  weight: number;

  @Prop()
  headCircumference?: number;

  @Prop({ required: true })
  height: number;
}

export type ChildGrowthHistoryDocument = ChildGrowthHistory & Document;

export const ChildGrowthHistorySchema =
  SchemaFactory.createForClass(ChildGrowthHistory);
