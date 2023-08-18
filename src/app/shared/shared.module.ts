import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ValidationErrorComponent} from './component/validation-error/validation-error.component';
import {HttpClientModule} from "@angular/common/http";
import {HttpClientService} from "./service/http-client.service";
import {LoggerService} from "./service/logger.service";


@NgModule({
  declarations: [
    ValidationErrorComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    HttpClientService,
    LoggerService
  ],
  exports: [
    ValidationErrorComponent,
  ]
})
export class SharedModule { }
