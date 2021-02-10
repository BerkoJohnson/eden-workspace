import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentController } from './departments/department.controller';
import { Department, DepartmentSchema } from './departments/department.schema';
import { DepartmentService } from './departments/department.service';
import { SubjectController } from './subjects/subject.controller';
import { Subject, SubjectSchema } from './subjects/subject.schema';
import { SubjectService } from './subjects/subject.service';

@Module({
  controllers: [SubjectController, DepartmentController],
  imports: [MongooseModule.forFeature([
    { name: Subject.name, schema: SubjectSchema},
    { name: Department.name, schema: DepartmentSchema},
  ])],
  exports: [],
  providers: [SubjectService, DepartmentService],
})
export class SettingsModule {}
