import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
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
import {MfaType} from "../../enum/mfa.enum";

@Component({
  selector: 'app-mfa-setup',
  templateUrl: './mfa-setup.component.html',
  styleUrls: ['./mfa-setup.component.css']
})
export class MfaSetupComponent extends BaseFormComponent implements OnInit {

  @ViewChild('qrCodeImage', { static: false }) qrCodeImage!: ElementRef;
  public mfaStatus!: MfaStatusResponse;
  public mfaDetail!: MfaDetailResponse;
  public isCodeVerification: boolean = false;
  public isQrVerification: boolean = false;
  public isVerificationCodeSent: boolean = false;
  public NO_MFA: string = 'Multi Factor Authenticator Reset to none';
  public qrCodeSecret: string = '';
  public isAllVerificationComplete: boolean = false;


  public constructor(
    protected formBuilder: FormBuilder,
    protected mfaService: MfaService,
    private renderer: Renderer2) {
    super();
  }

  public ngOnInit(): void {
    this.mfaService.getStatus()
      .subscribe({
        next: (result: MfaStatusResponse): void => {
          this.mfaStatus = result;
          this.initForm();
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
    this.formReady();
  }

  public setupMfa(): void {
    if (isFalsy(this.isSubmitting) && this.fleenHealthForm.valid) {
      this.disableSubmitting();
      this.mfaService.setup(this.fleenHealthForm.value)
        .subscribe({
          next: (result: MfaDetailResponse): void => {
            this.mfaDetail = result;
            this.initVerificationType(result);
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
            this.isAllVerificationComplete = true;
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

  private initVerificationType(mfaDetail: MfaDetailResponse): void {
    const { mfaType } = mfaDetail;
    if (mfaType === MfaType.EMAIL || mfaType === MfaType.PHONE) {
      this.isCodeVerification = true;
    } else if (mfaType === MfaType.AUTHENTICATOR) {
      this.isCodeVerification = true;
      this.isQrVerification = true;
      this.initAuthenticatorDetails(mfaDetail);
    } else if (mfaType === MfaType.NONE) {
      this.statusMessage = this.NO_MFA;
    }
  }

  private initAuthenticatorDetails(mfaDetail: MfaDetailResponse): void {
    const { qrCode, secret } = mfaDetail;
    this.qrCodeSecret = secret;

    const img = this.renderer.createElement('img');
    console.log(qrCode);
    this.renderer.setAttribute(img, 'src', qrCode);
    const container = this.qrCodeImage.nativeElement;
    this.renderer.appendChild(container, img);
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
