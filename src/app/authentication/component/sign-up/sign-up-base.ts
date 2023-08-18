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
import {GENDER, PROFESSIONAL_TYPES, VERIFICATION_TYPES} from "../../../shared/constant/enum-constant";
import {DATE, PASSWORD_PATTERNS, PHONE_NUMBER} from "../../../shared/util/format-pattern";
import {SignUpDto} from "../../dto/sign-up-dto";
import {AuthenticationService} from "../../service/authentication.service";
import {MINIMUM_AGE_ELIGIBILITY_FOR_ACCOUNT} from "../../../shared/constant/other-constant";

export abstract class SignUpBaseComponent {

  protected signUpDto: SignUpDto | undefined = new SignUpDto();
  protected signUpForm: FormGroup = new FormGroup<any>({});
  protected errorMessage: string | undefined;

  public initForm(): void {
    this.signUpForm = this.getFormBuilder().group({
      profileType: [this.signUpDto?.profileType,
        [Validators.required, enumTypeValidator(PROFESSIONAL_TYPES)]
      ],
      firstName: [this.signUpDto?.firstName,
        [Validators.required, Validators.minLength(2), Validators.maxLength(100)]
      ],
      lastName: [this.signUpDto?.lastName,
        [Validators.required, Validators.minLength(2), Validators.maxLength(100)]
      ],
      dateOfBirth: [this.signUpDto?.dateOfBirth,
        [Validators.required, dateOfBirthValidator(DATE), pastDateValidator, ageLimitValidator(MINIMUM_AGE_ELIGIBILITY_FOR_ACCOUNT)]
      ],
      emailAddress: [this.signUpDto?.emailAddress,
        {
          validators: [Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(150)],
          asyncValidators: [emailExistsValidator(this.getAuthenticationService())],
          updateOn: 'blur'
        }
      ],
      phoneNumber: [this.signUpDto?.phoneNumber,
        [Validators.required, Validators.minLength(4), Validators.maxLength(15), phoneNumberValidator(PHONE_NUMBER)]
      ],
      gender: [this.signUpDto?.gender,
        [Validators.required, enumTypeValidator(GENDER)]
      ],
      password: [this.signUpDto?.password,
        [Validators.required, passwordValidator(PASSWORD_PATTERNS)]
      ],
      confirmPassword: [this.signUpDto?.confirmPassword,
        [Validators.required, passwordValidator(PASSWORD_PATTERNS)]
      ],
      verificationType: [this.signUpDto?.verificationType,
        [Validators.required, enumTypeValidator(VERIFICATION_TYPES)]
      ]
    }, {
      validators: [fieldsMatchValidator('password', 'confirmPassword', 'Password', 'Confirm Password')]
    });
  }

  abstract getAuthenticationService(): AuthenticationService;

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

}
