import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseFormComponent} from "../../../base/component/base-form/base-form.component";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {passwordValidator} from "../../../shared/validator/validator";
import {PASSWORD_PATTERNS} from "../../../shared/util/format-pattern";
import {ChangePasswordDto} from "../../../shared/type/authentication";
import {ChangePasswordType} from "../../../shared/enum/authentication";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent extends BaseFormComponent implements OnInit {

  @Input('change-password-type') public changePasswordType: ChangePasswordType = ChangePasswordType.NONE;
  @Output() public changePassword: EventEmitter<ChangePasswordDto> = new EventEmitter<ChangePasswordDto>();

  public constructor(protected formBuilder: FormBuilder) {
    super();
  }

  public submit(): void {
    if (this.fleenHealthForm.valid) {
      const { password, confirmPassword } = this.fleenHealthForm.value;
      this.changePassword.emit({password, confirmPassword, type: this.changePasswordType });
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  protected initForm(): void {
    this.fleenHealthForm = this.formBuilder.group({
      password: ['', [Validators.required, passwordValidator(PASSWORD_PATTERNS)]],
      confirmPassword: ['', [Validators.required, passwordValidator(PASSWORD_PATTERNS)]],
    });
  }

  public setErrorMessage(errorMessage: string): void {
    this.errorMessage = errorMessage || '';
  }

  get changePasswordForm(): FormGroup {
    return this.fleenHealthForm;
  }

  get password(): AbstractControl | null | undefined {
    return this.fleenHealthForm?.get('password');
  }

  get confirmPassword(): AbstractControl | null | undefined {
    return this.fleenHealthForm?.get('confirmPassword');
  }

}
