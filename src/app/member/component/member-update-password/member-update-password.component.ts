import {Component, OnInit, ViewChild} from '@angular/core';
import {ChangePasswordDto} from "../../../shared/type/authentication";
import {ChangePasswordType} from "../../../shared/enum/authentication.enum";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {BaseFormComponent} from "../../../base/component/base-form/base-form.component";
import {passwordValidator} from "../../../shared/validator/validator";
import {PASSWORD_PATTERNS} from "../../../shared/util/format-pattern";
import {ANY_EMPTY} from "../../../shared/constant/other-constant";
import {Router} from "@angular/router";
import {isFalsy, isTruthy} from "../../../shared/util/helpers";
import {MemberService} from "../../service/member.service";
import {UpdatePasswordDto} from "../../dto/member.dto";
import {FleenHealthResponse} from "../../../shared/response/fleen-health.response";
import {ErrorResponse} from "../../../base/response/error-response";
import {ChangePasswordComponent} from "../../../shared/change-password/change-password.component";

@Component({
  selector: 'app-member-update-password',
  templateUrl: './member-update-password.component.html',
  styleUrls: ['./member-update-password.component.css']
})
export class MemberUpdatePasswordComponent extends BaseFormComponent implements OnInit {

  @ViewChild(ChangePasswordComponent) changePasswordComponent!: ChangePasswordComponent;
  protected formBuilder!: FormBuilder;
  public changePasswordType: ChangePasswordType = ChangePasswordType.UPDATE;
  public oldPassword: FormControl = new FormControl('');

  public statusMessage: string = '';

  public constructor(protected memberService: MemberService) {
    super();
  }

  protected override getRouter(): Router {
    return ANY_EMPTY;
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public updatePassword(dto: ChangePasswordDto): void {
    if (isFalsy(this.isSubmitting) && this.oldPassword.valid) {
      this.disableSubmitting();
      const oldPassword: string = this.oldPassword.value;
      const body: UpdatePasswordDto = { ...dto, oldPassword }
      this.memberService.updatePassword(body)
        .subscribe({
          next: (result: FleenHealthResponse): void => {
            this.statusMessage = result.message;
          },
          error: (error: ErrorResponse): void => {
            if (isTruthy(this.getChangePasswordComponent())) {
              this.getChangePasswordComponent()?.setErrorMessage(error.message);
            }
          },
          complete: (): void => {
            this.enableSubmitting();
          }
      });
    }
  }

  private initForm(): void {
    this.oldPassword.addValidators([Validators.required, passwordValidator(PASSWORD_PATTERNS)]);
  }

  private getChangePasswordComponent(): ChangePasswordComponent {
    return this.changePasswordComponent;
  }

}
