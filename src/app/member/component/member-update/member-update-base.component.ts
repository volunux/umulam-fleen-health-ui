import {AbstractControl, FormGroup, Validators} from "@angular/forms";
import {BaseFormComponent} from "../../../base/component/base-form/base-form.component";
import {
  ageLimitValidator,
  dateOfBirthValidator,
  enumTypeValidator,
  pastDateValidator
} from "../../../shared/validator/validator";
import {DATE} from "../../../shared/util/format-pattern";
import {MINIMUM_AGE_ELIGIBILITY_FOR_ACCOUNT} from "../../../shared/constant/other-constant";
import {DEFAULT_FORM_CONTROL_VALUE, GENDER} from "../../../shared/constant/enum-constant";
import {GetMemberUpdateDetailsResponse} from "../../response/get-member-update-details.response";
import {toIsoDate} from "../../../shared/util/helpers";

export abstract class MemberUpdateBaseComponent extends BaseFormComponent {

  protected entryView!: GetMemberUpdateDetailsResponse;

  public initForm(): void {
    this.fleenHealthForm = this.formBuilder.group({
      firstName: [this.entryView.firstName,
        [Validators.required, Validators.minLength(2), Validators.maxLength(100)]
      ],
      lastName: [this.entryView.lastName,
        [Validators.required, Validators.minLength(2), Validators.maxLength(100)]
      ],
      dateOfBirth: [toIsoDate(this.entryView.dateOfBirth),
        [Validators.required, dateOfBirthValidator(DATE), pastDateValidator, ageLimitValidator(MINIMUM_AGE_ELIGIBILITY_FOR_ACCOUNT)]
      ],
      gender: [this.entryView.gender,
        [Validators.required, enumTypeValidator(GENDER)]
      ],
      address: [DEFAULT_FORM_CONTROL_VALUE,
        [Validators.required, Validators.minLength(10), Validators.maxLength(500)]
      ],
    });
    this.formReady();
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
