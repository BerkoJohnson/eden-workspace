import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ElectionsService } from './elections.service';

import { ElectionsComponent } from './elections.component';
import { ElectionsHomeComponent } from './home/elections-home.component';
import { ListElectionsComponent } from './list/list-elections.component';
import { NewElectionComponent } from './new/new.component';
import { ViewElectionComponent } from './view/view.component';
import { EditElectionComponent } from './edit/edit.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { PositionsComponent } from './positions/positions.component';
import { StoreModule } from '@ngrx/store';
import * as fromElections from './elections.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ElectionEffects } from './election.effects';

const routes: Routes = [
  {
    path: '',
    component: ElectionsComponent,
    children: [
      { path: '', component: ElectionsHomeComponent },
      { path: 'new', component: NewElectionComponent },
      { path: 'edit', component: EditElectionComponent },
      { path: 'view', component: ViewElectionComponent },
      { path: 'positions', component: PositionsComponent },
      { path: 'candidates', component: CandidatesComponent },
    ],
  },
];

@NgModule({
  declarations: [
    ElectionsComponent,
    ElectionsHomeComponent,
    ListElectionsComponent,
    NewElectionComponent,
    ViewElectionComponent,
    EditElectionComponent,
    CandidatesComponent,
    PositionsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature(fromElections.electionsFeatureKey, fromElections.reducer),
    EffectsModule.forFeature([ElectionEffects]),

  ],
  exports: [RouterModule],
  providers: [ElectionsService],
})
export class ElectionsModule {}
