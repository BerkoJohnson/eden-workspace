import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { DefaultModule } from './default/default.module';
import { FullwidthModule } from './fullwidth/fullwidth.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { LoginGuard } from './auth/login.guard';
import { CantAccessPageComponent } from './cant-access-page/cant-access-page.component';
import { AppStoreModule } from './store/app-store.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MyProfileComponent,
    CantAccessPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DefaultModule,
    FullwidthModule,
    AuthModule,
    HttpClientModule,
    SharedModule,
    AppStoreModule,
  ],
  providers: [
    LoginGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
