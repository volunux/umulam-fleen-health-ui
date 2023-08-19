import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {passwordValidator} from "../../../shared/validator/validator";
import {PASSWORD_PATTERNS} from "../../../shared/util/format-pattern";
import {BaseFormComponent} from "../../../base/component/base-form/base-form.component";
import {SignInDto} from "../../dto/sign-in-dto";

export abstract class SignInBaseComponent extends BaseFormComponent {

  protected signUpDto: SignInDto | undefined = new SignInDto();

  public initForm(): void {
    this.fleenHealthForm = this.getFormBuilder().group({
      emailAddress: [this.signUpDto?.emailAddress,
        [Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(150)]
      ],
      password: [this.signUpDto?.password,
        [Validators.required, passwordValidator(PASSWORD_PATTERNS)]
      ],
    });
  }

  abstract getFormBuilder(): FormBuilder;

  get emailAddress(): AbstractControl | null | undefined {
    return this.signInForm?.get('emailAddress');
  }

  get password(): AbstractControl | null | undefined {
    return this.signInForm?.get('password');
  }

  get signInForm(): FormGroup {
    return this.fleenHealthForm;
  }

}
