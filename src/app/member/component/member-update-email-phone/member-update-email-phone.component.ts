import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {codeValidator, phoneNumberValidator} from "../../../shared/validator/validator";
import {PHONE_NUMBER, VERIFICATION_CODE} from "../../../shared/util/format-pattern";
import {MemberService} from "../../service/member.service";
import {GetMemberUpdateDetailsResponse} from "../../response/get-member-update-details.response";
import {ErrorResponse} from "../../../base/response/error-response";
import {withDefault} from "../../../shared/util/helpers";
import {BaseFormComponent} from "../../../base/component/base-form/base-form.component";
import {Router} from "@angular/router";
import {DEFAULT_FORM_CONTROL_VALUE} from "../../../shared/constant/enum-constant";
import {VerificationType} from "../../../shared/enum/authentication";

@Component({
  selector: 'app-member-update-email-phone',
  templateUrl: './member-update-email-phone.component.html',
  styleUrls: ['./member-update-email-phone.component.css']
})
export class MemberUpdateEmailPhoneComponent extends BaseFormComponent implements OnInit {

  public entryView!: GetMemberUpdateDetailsResponse;
  public emailAddressUpdateForm!: FormGroup;
  public phoneNumberUpdateForm!: FormGroup;
  public emailAddressFormErrorMessage: string = '';
  public phoneNumberFormErrorMessage: string = '';
  public emailAddressUpdateSuccess: boolean = false;
  public phoneNumberUpdateSuccess: boolean = false;
  public phoneVerificationCodeSent: boolean = false;
  public emailVerificationCodeSent: boolean = false;

  public constructor(protected memberService: MemberService,
                     protected router: Router,
                     protected formBuilder: FormBuilder) {
    super();
  }

  protected override getRouter(): Router {
    return this.router;
  }

  public ngOnInit(): void {
    this.getDetails();
  }

  private initForm(): void {
    this.initEmailAddressForm();
    this.initPhoneNumberForm();
    this.formReady();
  }

  public getDetails(): void {
    this.memberService.getDetails()
      .subscribe({
        next: (result: GetMemberUpdateDetailsResponse): void => {
          this.entryView = result;
          this.initForm();
        },
        error: (error: ErrorResponse): void => {
          this.handleError(error);
        }
    });
  }

  private initEmailAddressForm(): void {
    this.emailAddressUpdateForm = this.formBuilder.group({
      emailAddress: [withDefault(this.entryView.emailAddress),
        [Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(150)]
      ],
      code: [DEFAULT_FORM_CONTROL_VALUE,
        [Validators.required, Validators.minLength(1), Validators.maxLength(6), codeValidator(VERIFICATION_CODE)]
      ]
    });
  }

  private initPhoneNumberForm(): void {
    this.phoneNumberUpdateForm = this.formBuilder.group({
      phoneNumber: [withDefault(this.entryView.phoneNumber),
        [Validators.required, Validators.minLength(4), Validators.maxLength(15), phoneNumberValidator(PHONE_NUMBER)]
      ],
      code: [DEFAULT_FORM_CONTROL_VALUE,
        [Validators.required, Validators.minLength(1), Validators.maxLength(6), codeValidator(VERIFICATION_CODE)]
      ]
    });
  }

  public updateEmailAddress(): void {
    this.memberService.confirmUpdateEmailAddress(this.emailAddressUpdateForm.value)
      .subscribe({
        error: (error: ErrorResponse): void => {
          this.handleEmailFormError(error);
        },
        complete: (): void => {
          this.emailAddressUpdateSuccess = true;
        }
    });
  }

  public updatePhoneNumber(): void {
    this.memberService.confirmUpdatePhoneNumber(this.phoneNumberUpdateForm.value)
      .subscribe({
        error: (error: ErrorResponse): void => {
          this.handlePhoneFormError(error);
        },
        complete: (): void => {
          this.phoneNumberUpdateSuccess = true;
        }
    });
  }

  public sendVerificationCode(verificationType: VerificationType): void {
    this.disableVerificationCodeSent(verificationType);
    this.memberService.sendUpdatePhoneNumberCode({ verificationType })
      .subscribe({
        error: (error: ErrorResponse): void => {
          if (verificationType === VerificationType.EMAIL) {
            this.handleEmailFormError(error);
          } else if (verificationType === VerificationType.PHONE) {
            this.handlePhoneFormError(error);
          }
        },
        complete: (): void => {
          if (verificationType === VerificationType.EMAIL) {
            this.emailVerificationCodeSent = true;
          } else if (verificationType === VerificationType.PHONE) {
            this.phoneVerificationCodeSent = true;
          }
        }
    });
  }

  public handlePhoneFormError(error: ErrorResponse): void {
    this.phoneNumberFormErrorMessage = error?.message || '';
  }

  public handleEmailFormError(error: ErrorResponse): void {
    this.emailAddressFormErrorMessage = error?.message || '';
  }

  public disableVerificationCodeSent(verificationType: VerificationType): void {
    if (verificationType === VerificationType.EMAIL) {
      this.emailVerificationCodeSent = false;
    } else if (verificationType === VerificationType.PHONE) {
      this.phoneVerificationCodeSent = false;
    }
  }

  get emailAddress(): AbstractControl | null | undefined {
    return this.emailAddressUpdateForm.get('emailAddress');
  }

  get phoneNumber(): AbstractControl | null | undefined {
    return this.phoneNumberUpdateForm.get('phoneNumber');
  }

  get emailVerificationCode(): AbstractControl | null | undefined {
    return this.emailAddressUpdateForm.get('code');
  }

  get phoneVerificationCode(): AbstractControl | null | undefined {
    return this.phoneNumberUpdateForm.get('code');
  }

  protected readonly VerificationType = VerificationType;
}
