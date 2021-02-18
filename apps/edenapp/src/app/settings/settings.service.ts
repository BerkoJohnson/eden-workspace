import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IDepartmentBase,
  IDepartmentPayload,
  ISubjectBase,
  ISubjectPayload,
} from './settings.model';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  constructor(private http: HttpClient) {}

  addSubjects(data: ISubjectBase[]) {
    return this.http.post<ISubjectPayload[]>('/api/settings/subjects', {
      subjects: data,
    });
  }

  getSubjects() {
    return this.http.get<ISubjectPayload[]>('/api/settings/subjects');
  }

  getASubject(subjectID: string) {
    return this.http.get<ISubjectPayload>('/api/settings/subjects', {
      params: {
        id: subjectID,
      },
    });
  }

  addDepartment(data: IDepartmentBase) {
    return this.http.post<IDepartmentPayload[]>(
      '/api/settings/departments',
      data
    );
  }

  getDepartments() {
    return this.http.get<IDepartmentPayload[]>('/api/settings/departments');
  }

  getADepartment(departmentID: string) {
    return this.http.get<IDepartmentPayload>('/api/settings/departments', {
      params: {
        id: departmentID,
      },
    });
  }

  deleteProgram(id: string) {
    return this.http.delete<IDepartmentPayload>(
      '/api/settings/departments/' + id
    );
  }
}
