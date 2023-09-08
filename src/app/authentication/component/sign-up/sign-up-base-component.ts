import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
  ageLimitValidator,
  dateOfBirthValidator,
  emailExistsValidator,
  enumTypeValidator,
  fieldsMatchValidator,
  passwordValidator,
  pastDateValidator,
  phoneNumberValidator
} from "../../../shared/validator/validator";
import {
  DEFAULT_FORM_CONTROL_VALUE,
  DEFAULT_VERIFICATION_TYPE,
  GENDER,
  PROFILE_TYPES,
  VERIFICATION_TYPES
} from "../../../shared/constant/enum-constant";
import {DATE, PASSWORD_PATTERNS, PHONE_NUMBER} from "../../../shared/util/format-pattern";
import {MINIMUM_AGE_ELIGIBILITY_FOR_ACCOUNT} from "../../../shared/constant/other-constant";
import {AuthBaseComponent} from "../sign-in-up-base/auth-base.component";

export abstract class SignUpBaseComponent extends AuthBaseComponent {

  protected initForm(): void {
    this.fleenHealthForm = this.getFormBuilder().group({
      profileType: [DEFAULT_FORM_CONTROL_VALUE,
        [Validators.required, enumTypeValidator(PROFILE_TYPES)]
      ],
      firstName: [DEFAULT_FORM_CONTROL_VALUE,
        [Validators.required, Validators.minLength(2), Validators.maxLength(100)]
      ],
      lastName: [DEFAULT_FORM_CONTROL_VALUE,
        [Validators.required, Validators.minLength(2), Validators.maxLength(100)]
      ],
      dateOfBirth: [DEFAULT_FORM_CONTROL_VALUE,
        [Validators.required, dateOfBirthValidator(DATE), pastDateValidator, ageLimitValidator(MINIMUM_AGE_ELIGIBILITY_FOR_ACCOUNT)]
      ],
      emailAddress: [DEFAULT_FORM_CONTROL_VALUE,
        {
          validators: [Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(150)],
          asyncValidators: [emailExistsValidator(this.getAuthenticationService())],
          updateOn: 'blur'
        }
      ],
      phoneNumber: [DEFAULT_FORM_CONTROL_VALUE,
        [Validators.required, Validators.minLength(4), Validators.maxLength(15), phoneNumberValidator(PHONE_NUMBER)]
      ],
      gender: [DEFAULT_FORM_CONTROL_VALUE,
        [Validators.required, enumTypeValidator(GENDER)]
      ],
      password: [DEFAULT_FORM_CONTROL_VALUE,
        [Validators.required, passwordValidator(PASSWORD_PATTERNS)]
      ],
      confirmPassword: [DEFAULT_FORM_CONTROL_VALUE,
        [Validators.required, passwordValidator(PASSWORD_PATTERNS)]
      ],
      verificationType: [DEFAULT_VERIFICATION_TYPE,
        [Validators.required, enumTypeValidator(VERIFICATION_TYPES)]
      ]
    }, {
      validators: [fieldsMatchValidator('password', 'confirmPassword', 'Password', 'Confirm Password')]
    });
  }

  abstract getFormBuilder(): FormBuilder;

  get profileType(): AbstractControl | null | undefined {
    return this.signUpForm?.get('profileType');
  }

  get firstName(): AbstractControl | null | undefined {
    return this.signUpForm?.get('firstName');
  }

  get lastName(): AbstractControl | null | undefined {
    return this.signUpForm?.get('lastName');
  }

  get dateOfBirth(): AbstractControl | null | undefined {
    return this.signUpForm?.get('dateOfBirth');
  }

  get emailAddress(): AbstractControl | null | undefined {
    return this.signUpForm?.get('emailAddress');
  }

  get phoneNumber(): AbstractControl | null | undefined {
    return this.signUpForm?.get('phoneNumber');
  }

  get gender(): AbstractControl | null | undefined {
    return this.signUpForm?.get('gender');
  }

  get password(): AbstractControl | null | undefined {
    return this.signUpForm?.get('password');
  }

  get confirmPassword(): AbstractControl | null | undefined {
    return this.signUpForm?.get('confirmPassword');
  }

  get verificationType(): AbstractControl | null | undefined {
    return this.signUpForm?.get('verificationType');
  }

  get signUpForm(): FormGroup {
    return this.fleenHealthForm;
  }

}
