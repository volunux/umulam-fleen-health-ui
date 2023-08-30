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
    {provide: HTTP_INTERCEPTORS, useClass: ContentTypeInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true},
    LocalStorageService
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
