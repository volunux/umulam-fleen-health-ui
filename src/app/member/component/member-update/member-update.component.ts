import {Component, OnInit} from '@angular/core';
import {BaseFormComponent} from "../../../base/component/base-form/base-form.component";
import {MemberService} from "../../service/member.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ANY_EMPTY, MINIMUM_AGE_ELIGIBILITY_FOR_ACCOUNT} from "../../../shared/constant/other-constant";
import {Router} from "@angular/router";
import {GetMemberUpdateDetailsResponse} from "../../response/get-member-update-details.response";
import {ErrorResponse} from "../../../base/response/error-response";
import {DEFAULT_FORM_CONTROL_VALUE, GENDER} from "../../../shared/constant/enum-constant";
import {
  ageLimitValidator,
  dateOfBirthValidator,
  enumTypeValidator,
  pastDateValidator
} from "../../../shared/validator/validator";
import {DATE} from "../../../shared/util/format-pattern";

@Component({
  selector: 'app-member-update',
  templateUrl: './member-update.component.html',
  styleUrls: ['./member-update.component.css']
})
export class MemberUpdateComponent extends BaseFormComponent implements OnInit {

  protected entryView!: GetMemberUpdateDetailsResponse;

  public constructor(protected memberService: MemberService,
                     protected formBuilder: FormBuilder) {
    super();
  }

  public ngOnInit(): void {
    this.memberService.getUpdateDetails()
      .subscribe({
        next: (result: GetMemberUpdateDetailsResponse): void => {
          this.entryView = result;
        },
        error: (error: ErrorResponse): void => {
          this.handleError(error);
        }
      });
  }

  public initForm(): void {
    this.fleenHealthForm = this.formBuilder.group({
      firstName: [this.entryView.firstName,
        [Validators.required, Validators.minLength(2), Validators.maxLength(100)]
      ],
      lastName: [this.entryView.lastName,
        [Validators.required, Validators.minLength(2), Validators.maxLength(100)]
      ],
      dateOfBirth: [this.entryView.dateOfBirth,
        [Validators.required, dateOfBirthValidator(DATE), pastDateValidator, ageLimitValidator(MINIMUM_AGE_ELIGIBILITY_FOR_ACCOUNT)]
      ],
      gender: [this.entryView.gender,
        [Validators.required, enumTypeValidator(GENDER)]
      ],
      address: [DEFAULT_FORM_CONTROL_VALUE,
        [Validators.required, Validators.minLength(10), Validators.maxLength(500)]
      ],
    });
  }

  protected override getRouter(): Router {
    return ANY_EMPTY;
  }

  get memberUpdateForm(): FormGroup {
    return this.fleenHealthForm;
  }

  get firstName(): AbstractControl | null | undefined {
    return this.memberUpdateForm.get('firstName');
  }

  get lastName(): AbstractControl | null | undefined {
    return this.memberUpdateForm.get('lastName');
  }

  get gender(): AbstractControl | null | undefined {
    return this.memberUpdateForm.get('gender');
  }

  get dateOfBirth(): AbstractControl | null | undefined {
    return this.memberUpdateForm.get('dateOfBirth');
  }

  get address(): AbstractControl | null | undefined {
    return this.memberUpdateForm.get('address');
  }

}
