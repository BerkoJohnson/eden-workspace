import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { PageListComponent } from './page-list/page-list.component';

import { WsService } from './ws.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    PageListComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [WsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
