import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RepeatDirective } from './repeat.directive';
import { PageComponent } from './Page/Page.component';
import { AdvancedGridsComponent } from './advanced-grids/advanced-grids.component';
import { PageLayoutComponent } from './page-layout/page-layout.component';

@NgModule({
  declarations: [			AppComponent,
      HomeComponent,
      RepeatDirective,
      PageComponent,
      AdvancedGridsComponent,
      PageLayoutComponent
   ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
