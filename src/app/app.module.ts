import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthenticationModule} from "./authentication/authentication.module";
import {FleenHeatlhComponent} from './base/component/fleen-heatlh/fleen-heatlh.component';
import {TemplatePageTitleStrategy} from "./base/strategy/template-page-title.strategy";
import {TitleStrategy} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import { ShowErrorDirective } from './base/directive/show-error.directive';
import { FormFieldComponent } from './base/component/form-field/form-field.component';

@NgModule({
  declarations: [
    AppComponent,
    FleenHeatlhComponent,
    ShowErrorDirective,
    FormFieldComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthenticationModule,
    AppRoutingModule,
  ],
  providers: [
    {provide: TitleStrategy, useClass: TemplatePageTitleStrategy}
  ],
  exports: [
    ShowErrorDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
