import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionsRoutingModule } from './collections-routing.module';
import { CollectionsHomeComponent } from './collections-home/collections-home.component';


import { SharedModule } from '../shared/shared.module';
import { PartnersComponent } from './partners/partners.component';
import { BiographyComponent } from './biography/biography.component';
import { CompaniesComponent } from './companies/companies.component';

@NgModule({
  declarations: [
    CollectionsHomeComponent,
    BiographyComponent,
    PartnersComponent,
    CompaniesComponent,
  ],
  imports: [CommonModule, CollectionsRoutingModule, SharedModule],
  exports: [CollectionsHomeComponent],
})
export class CollectionsModule {}
