import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateDepartmentDto } from './department.model';
import { DepartmentService } from './department.service';

@Controller('settings/departments')
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  @Get()
  getSubjects() {
    return this.departmentService.getDepartments();
  }

  @Get(':id')
  getSubject(@Param() id: string) {
    return this.departmentService.getDepartment(id);
  }

  @Post()
  addSubjects(@Body(ValidationPipe) createDeptDto: CreateDepartmentDto) {
    return this.departmentService.addDepartment(createDeptDto);
  }
}
