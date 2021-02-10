import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import {} from './department.model';

export type DepartmentDocument = Department & mongoose.Document;

@Schema({ timestamps: true })
export class Department {
  @Prop({ required: true, trim: true, unique: true })
  title: string;

  @Prop()
  hod: string;

  @Prop({ type: [{ ref: 'Subject', type: mongoose.Schema.Types.ObjectId }] })
  subjects: string[];
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
