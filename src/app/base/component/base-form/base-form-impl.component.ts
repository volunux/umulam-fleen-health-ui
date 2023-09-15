import {BaseFormComponent} from "./base-form.component";
import {ANY_EMPTY} from "../../../shared/constant/other-constant";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";

export abstract class BaseFormImplComponent extends BaseFormComponent {

  protected formBuilder!: FormBuilder;

  protected override getRouter(): Router {
    return ANY_EMPTY;
  }

}
