import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateSubjectDto } from './subject.model';
import { SubjectService } from './subject.service';

@Controller('settings/subjects')
export class SubjectController {
  constructor(private subjectService: SubjectService) {}

  @Get()
  getSubjects() {
    return this.subjectService.getSubjects();
  }

  @Get(':id')
  getSubject(@Param() id: string) {
    return this.subjectService.getSubject(id);
  }

  @Post()
  addSubjects(@Body(ValidationPipe) createSubjectDto: CreateSubjectDto) {
    return this.subjectService.addSubjects(createSubjectDto);
  }
}
