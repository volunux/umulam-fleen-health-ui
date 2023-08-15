import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthenticationModule} from "./authentication/authentication.module";
import {FleenHeatlhComponent} from './base/component/fleen-heatlh/fleen-heatlh.component';
import {TemplatePageTitleStrategy} from "./base/strategy/template-page-title.strategy";
import {TitleStrategy} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {FormFieldComponent} from './shared/component/form-field/form-field.component';
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    FleenHeatlhComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthenticationModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    {provide: TitleStrategy, useClass: TemplatePageTitleStrategy}
  ],
  exports: [
    FormFieldComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
