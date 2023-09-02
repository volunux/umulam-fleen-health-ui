import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FleenHeatlhComponent} from './base/component/fleen-heatlh/fleen-heatlh.component';
import {TemplatePageTitleStrategy} from "./base/strategy/template-page-title.strategy";
import {TitleStrategy} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ContentTypeInterceptor} from "./base/interceptor/content-type.interceptor";
import {LocalStorageService} from "./base/service/local-storage.service";
import {AuthorizationInterceptor} from "./base/interceptor/authorization.interceptor";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {JwtService} from "./base/service/jwt.service";
import {LoggerService} from "./base/service/logger.service";
import {AuthGuard} from "./base/guard/auth.guard";
import {AuthenticationService} from "./authentication/service/authentication.service";
import {SessionStorageService} from "./base/service/session-storage.service";

@NgModule({
  declarations: [
    AppComponent,
    FleenHeatlhComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    {provide: TitleStrategy, useClass: TemplatePageTitleStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ContentTypeInterceptor, multi: true},
    AuthenticationService,
    LocalStorageService,
    SessionStorageService,
    JwtService,
    LoggerService,
    AuthGuard,
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
