import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


import * as fromSettings from './settings.reducer';
import { SettingsEffects } from './settings.effect';

import { SettingsHomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { SubjectsComponent } from './subjects/subjects.component';
import { NewSubjectComponent } from './subjects/new/new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SubjectListComponent } from './subjects/list/list.component';
import { DepartmentsComponent } from './departments/department.component';
import { NewDepartmentComponent } from './departments/new/dept-new.component';
import { DepartmentsListComponent } from './departments/list/dept-list.component';
import { EditDepartmentComponent } from './departments/edit/dept-edit.component';


const ROUTES: Routes = [
  {
    path: '',
    component: SettingsHomeComponent,
    children: [
      {
        path: 'subjects',
        component: SubjectsComponent,
        children: [
          // { path: '', component: SubjectListComponent },
          { path: 'new', component: NewSubjectComponent },
        ],
      },
      {
        path: 'departments',
        component: DepartmentsComponent,
        children: [
          { path: 'new', component: NewDepartmentComponent },
          { path: 'edit', component: EditDepartmentComponent },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [
    SettingsHomeComponent,
    SubjectsComponent,
    NewSubjectComponent,
    SubjectListComponent,
    DepartmentsComponent,
    DepartmentsListComponent,
    NewDepartmentComponent,
    EditDepartmentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature(fromSettings.settingsFeatureKey, fromSettings.reducer),
    EffectsModule.forFeature([SettingsEffects]),
  ],
})
export class SettingsModule {}
