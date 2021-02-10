import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSubjectDto } from './subject.model';
import { Subject, SubjectDocument } from './subject.schema';

@Injectable()
export class SubjectService {
  constructor(
    @InjectModel(Subject.name)
    private subjectModel: Model<SubjectDocument>
  ) {}

  getSubjects() {
    return this.subjectModel.find().exec();
  }

  getSubject(Id: string) {
    return this.subjectModel.findById(Id).exec();
  }

  deleteSubject(Id: string) {
    return this.subjectModel.findOneAndDelete({_id: Id}).exec();
  }

  async addSubjects(subjectsDto: CreateSubjectDto) {
    const { subjects } = subjectsDto;

    try {
      // track the saved subjects for use later
      const savedSubjects: string[] = [];

      // loop through the subjects received
      for (let i = 0; i < subjects.length; i++) {

        const mySubject = new this.subjectModel();
        mySubject.title = subjects[i].title;
        mySubject.type = subjects[i].type;

        // push saved subject _id to savedSubjects
        await mySubject.save();
        savedSubjects.push(mySubject._id);
      }

      // return all documents of these saved subjects
      return await this.subjectModel.find().where('_id').in(savedSubjects);
    } catch (error) {
      console.log(error);
    }
  }
}
