import {Component, OnInit} from '@angular/core';
import {BaseFormComponent} from "../../../base/component/base-form/base-form.component";
import {ANY_EMPTY} from "../../../shared/constant/other-constant";
import {Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MfaStatusResponse} from "../../response/mfa-status.response";
import {MfaService} from "../../service/mfa.service";
import {ErrorResponse} from "../../../base/response/error-response";
import {DEFAULT_FORM_CONTROL_VALUE, MFA_SETUP_TYPE} from "../../../shared/constant/enum-constant";
import {codeValidator, enumTypeValidator} from "../../../shared/validator/validator";
import {VERIFICATION_CODE} from "../../../shared/util/format-pattern";
import {isFalsy} from "../../../shared/util/helpers";
import {MfaDetailResponse} from "../../response/mfa-detail.response";
import {FleenHealthResponse} from "../../../shared/response/fleen-health.response";

@Component({
  selector: 'app-mfa-setup',
  templateUrl: './mfa-setup.component.html',
  styleUrls: ['./mfa-setup.component.css']
})
export class MfaSetupComponent extends BaseFormComponent implements OnInit {

  public mfaStatus!: MfaStatusResponse;
  public mfaDetail!: MfaDetailResponse;
  public isVerificationStage: boolean = false;
  public statusMessage: string = '';
  public isVerificationCodeSent: boolean = false;

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
    if (isFalsy(this.isSubmitting) && this.fleenHealthForm.valid) {
      this.disableSubmitting();
      this.mfaService.setup(this.fleenHealthForm.value)
        .subscribe({
          next: (result: MfaDetailResponse): void => {
            this.mfaDetail = result;
          },
          error: (error: ErrorResponse): void => {
            this.handleError(error);
          },
          complete: (): void => {
            this.enableSubmitting();
            this.addCodeFormControl();
          }
      });
    }
  }

  public resendVerificationCode(): void {
    if (isFalsy(this.isSubmitting) && this.fleenHealthForm.valid) {
      this.disableSubmitting();
      this.isVerificationCodeSent = false;
      this.mfaService.setup(this.fleenHealthForm.value)
        .subscribe({
          error: (error: ErrorResponse): void => {
            this.handleError(error);
          },
          complete: (): void => {
            this.enableSubmitting();
            this.isVerificationCodeSent = true;
          }
        });
    }
  }

  public confirmMfaSetup(): void {
    if (isFalsy(this.isSubmitting) && this.fleenHealthForm.valid) {
      this.disableSubmitting();
      this.mfaService.confirmSetup(this.fleenHealthForm.value)
        .subscribe({
          next: (result: FleenHealthResponse): void => {
            this.statusMessage = result.message;
          },
          error: (error: ErrorResponse): void => {
            this.handleError(error);
          }
        })
    }
  }

  private addCodeFormControl(): void {
    this.fleenHealthForm.addControl(
      'code', this.formBuilder.control('', [
        Validators.required, Validators.minLength(1), Validators.maxLength(6), codeValidator(VERIFICATION_CODE)]
      )
    );
  }

  get mfaSetupForm(): FormGroup {
    return this.fleenHealthForm;
  }

  get mfaType(): AbstractControl | null | undefined {
    return this.mfaSetupForm?.get('mfaType');
  }

  get code(): AbstractControl | null | undefined {
    return this.mfaSetupForm?.get('code');
  }
}
