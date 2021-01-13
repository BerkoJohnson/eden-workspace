import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { DefaultModule } from './comps/default/default.module';
import { FullwidthModule } from './comps/fullwidth/fullwidth.module';

import { JwtInterceptor } from './interceptors/jwt.interceptor';

import { DashboardComponent } from './comps/dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { LoginGuard } from './comps/auth/login.guard';

@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    DefaultModule,
    FullwidthModule,
  ],
  providers: [
    LoginGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
