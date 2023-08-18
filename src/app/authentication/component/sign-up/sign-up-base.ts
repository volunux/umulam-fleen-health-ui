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

  public initForm(): void {
    this.signUpForm = this.getFormBuilder().group({
      profile_type: [this.signUpDto?.profileType,
        [Validators.required, enumTypeValidator(PROFESSIONAL_TYPES)]
      ],
      first_name: [this.signUpDto?.firstName,
        [Validators.required, Validators.minLength(2), Validators.maxLength(100)]
      ],
      last_name: [this.signUpDto?.lastName,
        [Validators.required, Validators.minLength(2), Validators.maxLength(100)]
      ],
      date_of_birth: [this.signUpDto?.dateOfBirth,
        [Validators.required, dateOfBirthValidator(DATE), pastDateValidator, ageLimitValidator(MINIMUM_AGE_ELIGIBILITY_FOR_ACCOUNT)]
      ],
      email_address: [this.signUpDto?.emailAddress,
        {
          validators: [Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(150)],
          asyncValidators: [emailExistsValidator(this.getAuthenticationService())],
          updateOn: 'blur'
        }
      ],
      phone_number: [this.signUpDto?.phoneNumber,
        [Validators.required, Validators.minLength(4), Validators.maxLength(15), phoneNumberValidator(PHONE_NUMBER)]
      ],
      gender: [this.signUpDto?.gender,
        [Validators.required, enumTypeValidator(GENDER)]
      ],
      password: [this.signUpDto?.password,
        [Validators.required, passwordValidator(PASSWORD_PATTERNS)]
      ],
      confirm_password: [this.signUpDto?.confirmPassword,
        [Validators.required, passwordValidator(PASSWORD_PATTERNS)]
      ],
      verification_type: [this.signUpDto?.verificationType,
        [Validators.required, enumTypeValidator(VERIFICATION_TYPES)]
      ]
    }, {
      validators: [fieldsMatchValidator('password', 'confirm_password', 'Password', 'Confirm Password')]
    });
  }

  abstract getAuthenticationService(): AuthenticationService;

  abstract getFormBuilder(): FormBuilder;

  get profileType(): AbstractControl | null | undefined {
    return this.signUpForm?.get('profileType');
  }

  get firstName(): AbstractControl | null | undefined {
    return this.signUpForm?.get('first_name');
  }

  get lastName(): AbstractControl | null | undefined {
    return this.signUpForm?.get('last_name');
  }

  get dateOfBirth(): AbstractControl | null | undefined {
    return this.signUpForm?.get('date_of_birth');
  }

  get emailAddress(): AbstractControl | null | undefined {
    return this.signUpForm?.get('email_address');
  }

  get phoneNumber(): AbstractControl | null | undefined {
    return this.signUpForm?.get('phone_number');
  }

  get gender(): AbstractControl | null | undefined {
    return this.signUpForm?.get('gender');
  }

  get password(): AbstractControl | null | undefined {
    return this.signUpForm?.get('password');
  }

  get confirmPassword(): AbstractControl | null | undefined {
    return this.signUpForm?.get('confirm_password');
  }

  get verificationType(): AbstractControl | null | undefined {
    return this.signUpForm?.get('verification_type');
  }
}
