import {NgModule} from '@angular/core';
import {ValidationErrorComponent} from './component/validation-error/validation-error.component';
import {HttpClientService} from "./service/http-client.service";
import {LoggerService} from "../base/service/logger.service";
import {ReactiveFormsModule} from "@angular/forms";
import {BaseHttpService} from "./service/base-http.service";
import {SearchFormDeleteMenuComponent} from './component/search-form-delete-menu/search-form-delete-menu.component';
import {PaginationComponent} from './component/pagination/pagination.component';
import {RowEntryOptionComponent} from './component/row-entry-option/row-entry-option.component';
import {CommonModule} from "@angular/common";
import { EntriesDeleteAllComponent } from './component/entries-delete-all/entries-delete-all.component';


@NgModule({
  declarations: [
    ValidationErrorComponent,
    SearchFormDeleteMenuComponent,
    PaginationComponent,
    RowEntryOptionComponent,
    EntriesDeleteAllComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    BaseHttpService,
    HttpClientService,
    LoggerService
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    ValidationErrorComponent,
    SearchFormDeleteMenuComponent,
    PaginationComponent,
    RowEntryOptionComponent,
    EntriesDeleteAllComponent,
  ]
})
export class SharedModule { }
