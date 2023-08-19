import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthenticationModule} from "./authentication/authentication.module";
import {FleenHeatlhComponent} from './base/component/fleen-heatlh/fleen-heatlh.component';
import {TemplatePageTitleStrategy} from "./base/strategy/template-page-title.strategy";
import {TitleStrategy} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./shared/shared.module";
import {ContentTypeInterceptor} from "./base/interceptor/content-type.interceptor";
import { BaseComponent } from './base/component/base/base.component';
import { BaseFormComponent } from './base/component/base-form/base-form.component';

@NgModule({
  declarations: [
    AppComponent,
    FleenHeatlhComponent,
    BaseComponent,
    BaseFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthenticationModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    {provide: TitleStrategy, useClass: TemplatePageTitleStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: ContentTypeInterceptor, multi: true}
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
