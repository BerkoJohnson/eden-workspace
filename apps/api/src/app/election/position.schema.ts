import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type PositionDocument = Position & mongoose.Document;

@Schema({ timestamps: true })
export class Position {
  @Prop({
    trim: true,
    required: true,
    unique: true,
  })
  pos_name: string;

  @Prop({ ref: 'Election', type: mongoose.Schema.Types.ObjectId })
  election: string;

  @Prop({ type: [{ ref: 'Candidate', type: mongoose.Schema.Types.ObjectId }] })
  candidates: string[];
}

export const PositionSchema = SchemaFactory.createForClass(Position);
