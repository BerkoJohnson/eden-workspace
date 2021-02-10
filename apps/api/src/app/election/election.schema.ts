import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type ElectionDocument = Election & mongoose.Document;

@Schema({ timestamps: true })
export class Election {
  @Prop({
    required: true,
    unique: true,
    trim: true,
  })
  title: string;

  @Prop({ required: true, trim: true })
  academicYear: string;

  @Prop({
    type: [{ ref: 'Position', type: mongoose.Schema.Types.ObjectId }],
  })
  positions: string[];

  @Prop({
    type: [{ ref: 'Candidate', type: mongoose.Schema.Types.ObjectId }],
  })
  candidates: string[];
}

export const ElectionSchema = SchemaFactory.createForClass(Election);
