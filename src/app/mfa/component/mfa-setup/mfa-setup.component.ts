import {Component, OnInit} from '@angular/core';
import {BaseFormComponent} from "../../../base/component/base-form/base-form.component";
import {ANY_EMPTY} from "../../../shared/constant/other-constant";
import {Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MfaStatusResponse} from "../../response/mfa-status.response";
import {MfaService} from "../../service/mfa.service";
import {ErrorResponse} from "../../../base/response/error-response";
import {DEFAULT_FORM_CONTROL_VALUE, MFA_SETUP_TYPE} from "../../../shared/constant/enum-constant";
import {enumTypeValidator} from "../../../shared/validator/validator";

@Component({
  selector: 'app-mfa-setup',
  templateUrl: './mfa-setup.component.html',
  styleUrls: ['./mfa-setup.component.css']
})
export class MfaSetupComponent extends BaseFormComponent implements OnInit {

  public mfaStatus!: MfaStatusResponse;

  public constructor(
    protected formBuilder: FormBuilder,
    protected mfaService: MfaService) {
    super();
  }

  public ngOnInit(): void {
    this.mfaService.getStatus()
      .subscribe({
        next: (result: MfaStatusResponse): void => {
          this.mfaStatus = result;
        },
        error: (error: ErrorResponse): void => {
          this.handleError(error);
        }
    });
  }

  protected override getRouter(): Router {
    return ANY_EMPTY;
  }

  public initForm(): void {
    this.fleenHealthForm = this.formBuilder.group({
      mfaType: [DEFAULT_FORM_CONTROL_VALUE,
        [Validators.required, enumTypeValidator(MFA_SETUP_TYPE)]
      ]
    });
  }

  public setupMfa(): void {

  }

  get mfaSetupForm(): FormGroup {
    return this.fleenHealthForm;
  }

  get mfaType(): AbstractControl | null | undefined {
    return this.mfaSetupForm?.get('mfaType');
  }
}
