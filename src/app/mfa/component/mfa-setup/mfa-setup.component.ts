import { Component } from '@angular/core';
import {BaseFormComponent} from "../../../base/component/base-form/base-form.component";
import {ANY_EMPTY} from "../../../shared/constant/other-constant";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-mfa-setup',
  templateUrl: './mfa-setup.component.html',
  styleUrls: ['./mfa-setup.component.css']
})
export class MfaSetupComponent extends BaseFormComponent {

  public constructor(
    protected formBuilder: FormBuilder) {
    super();
  }

  protected override getRouter(): Router {
    return ANY_EMPTY;
  }


}
