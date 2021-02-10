import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDepartmentDto } from './department.model';
import { DepartmentDocument, Department } from './department.schema';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department.name)
    private departmentModel: Model<DepartmentDocument>
  ) {}

  getDepartments() {
    return this.departmentModel.find().populate({ path: 'subjects' }).exec();
  }

  getDepartment(Id: string) {
    return this.departmentModel.findById(Id).populate({ path: 'subjects' }).exec();
  }

  deleteDepartment(Id: string) {
    return this.departmentModel.findOneAndDelete({ _id: Id }).exec();
  }

  async addDepartment(createDeptDto: CreateDepartmentDto) {
    try {
      const foundDept = await this.departmentModel.findOne({
        title: createDeptDto.title,
      });

      if (foundDept) {
        throw new BadRequestException(
          'A department with the same title exists'
        );
      }
      const myDepartment = new this.departmentModel();
      myDepartment.title = createDeptDto.title;
      myDepartment.hod = createDeptDto.hod;

      if (createDeptDto.subjects.length >= 1) {
        myDepartment.subjects = [
          ...myDepartment.subjects,
          ...createDeptDto.subjects,
        ];
      }

      return myDepartment.save();
    } catch (error) {
      console.log(error);
    }
  }
}
