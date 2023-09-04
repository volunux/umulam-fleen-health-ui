import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseFormComponent} from "../../base/component/base-form/base-form.component";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {passwordValidator} from "../validator/validator";
import {PASSWORD_PATTERNS} from "../util/format-pattern";
import {ChangePasswordDto} from "../type/authentication";
import {ChangePasswordType} from "../enum/authentication.enum";
import {ANY_EMPTY} from "../constant/other-constant";
import {Router} from "@angular/router";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent extends BaseFormComponent implements OnInit {

  @Input('is-submitting') public override isSubmitting: boolean = false;
  @Input('change-password-type') public changePasswordType: ChangePasswordType = ChangePasswordType.NONE;
  @Output() public changePassword: EventEmitter<ChangePasswordDto> = new EventEmitter<ChangePasswordDto>();

  public constructor(protected formBuilder: FormBuilder) {
    super();
  }

  public ngOnInit(): void {
    this.initForm();
  }

  protected override getRouter(): Router {
    return ANY_EMPTY;
  }

  public submit(): void {
    if (this.fleenHealthForm.valid) {
      const { password, confirmPassword } = this.fleenHealthForm.value;
      this.changePassword.emit({password, confirmPassword, type: this.changePasswordType });
    }
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
