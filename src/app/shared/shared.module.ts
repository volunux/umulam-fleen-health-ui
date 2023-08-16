import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroupComponent} from "./component/form-field/form-group.component";
import {FormErrorService} from "./service/form-error.service";
import {ShowErrorDirective} from "./directive/show-error.directive";
import {ValidationErrorComponent} from './component/validation-error/validation-error.component';
import {HttpClientModule} from "@angular/common/http";
import {HttpClientService} from "./service/http-client.service";
import {LoggerService} from "./service/logger.service";


@NgModule({
  declarations: [
    FormGroupComponent,
    ShowErrorDirective,
    ValidationErrorComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    FormErrorService,
    HttpClientService,
    LoggerService
  ],
  exports: [
    FormGroupComponent,
    ShowErrorDirective,
    ValidationErrorComponent
  ]
})
export class SharedModule { }
