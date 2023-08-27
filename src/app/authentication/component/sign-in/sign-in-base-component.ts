import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {passwordValidator} from "../../../shared/validator/validator";
import {PASSWORD_PATTERNS} from "../../../shared/util/format-pattern";
import {AuthBaseComponent} from "../sign-in-up-base/auth-base.component";

export abstract class SignInBaseComponent extends AuthBaseComponent {

  public initForm(): void {
    this.fleenHealthForm = this.getFormBuilder().group({
      emailAddress: ['',
        [Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(150)]
      ],
      password: ['',
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
