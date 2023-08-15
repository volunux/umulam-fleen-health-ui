import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormFieldComponent} from "./component/form-field/form-field.component";
import {FormErrorService} from "./service/form-error.service";
import {ShowErrorDirective} from "./directive/show-error.directive";


@NgModule({
  declarations: [
    FormFieldComponent,
    ShowErrorDirective
  ],
  imports: [
    CommonModule
  ],
  providers: [
    FormErrorService
  ],
  exports: [
    FormFieldComponent
  ]
})
export class SharedModule { }
