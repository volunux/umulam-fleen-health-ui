import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ValidationErrorComponent} from './component/validation-error/validation-error.component';
import {HttpClientModule} from "@angular/common/http";
import {HttpClientService} from "./service/http-client.service";
import {LoggerService} from "./service/logger.service";
import {ReactiveFormsModule} from "@angular/forms";
import {BaseHttpService} from "./service/base-http.service";
import { BaseEntriesComponent } from './component/base-entries/base-entries.component';
import { SearchFormComponent } from './component/search-form/search-form.component';
import { PaginationComponent } from './component/pagination/pagination.component';


@NgModule({
  declarations: [
    ValidationErrorComponent,
    BaseEntriesComponent,
    SearchFormComponent,
    PaginationComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    BaseHttpService,
    HttpClientService,
    LoggerService
  ],
  exports: [
    ValidationErrorComponent,
    SearchFormComponent,
    PaginationComponent,
  ]
})
export class SharedModule { }
