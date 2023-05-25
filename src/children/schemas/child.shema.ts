import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Child {
  @Prop({ required: true })
  parentUsername: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  birthday: Date;

  @Prop()
  photo?: string;
}

export type ChildDocument = Child & Document;

export const ChildSchema = SchemaFactory.createForClass(Child);
