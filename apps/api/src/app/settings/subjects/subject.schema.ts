import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { SubjectTypes } from './subject.model';

export type SubjectDocument = Subject & mongoose.Document;

@Schema({ timestamps: true })
export class Subject {
  @Prop({ required: true, trim: true, unique: true })
  title: string;

  @Prop({
    required: true,
    enum: [SubjectTypes.CORE, SubjectTypes.ELECTIVE],
  })
  type: string;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
