import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type CandidateDocument = Candidate & mongoose.Document;

@Schema({ timestamps: true })
export class Candidate {
  @Prop({
    required: true,
    trim: true,
  })
  firstName: string;

  @Prop({
    required: true,
    trim: true,
  })
  lastName: string;

  @Prop({
    enum: ['Male','Female'],
    required: true
  })
  gender: string;

  @Prop({
    required: true
  })
  dob: string;

  @Prop({required: true})
  room: string;

  @Prop({required: true})
  nickname: string;

  @Prop({required: true})
  displayMessage: string;

  @Prop({
    ref: 'Position',
    type: mongoose.Schema.Types.ObjectId,
    required: true
  })
  position: string;
}

export const CandidateSchema = SchemaFactory.createForClass(Candidate);
