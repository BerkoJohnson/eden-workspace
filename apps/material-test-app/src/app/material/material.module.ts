import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggle } from '@angular/material/button-toggle';

const MatSubModules = [
  MatButtonModule,
  MatButtonToggle,
  
];

@NgModule({
  imports: [MatSubModules],
  exports: [MatSubModules],
})
export class MaterialModule {}
