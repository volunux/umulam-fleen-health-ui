import {
  DEFAULT_FORM_CONTROL_VALUE,
  PROFESSIONAL_QUALIFICATION_TYPES,
  PROFESSIONAL_TYPES
} from "../../../shared/constant/enum-constant";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {enumTypeValidator, isNumberValidator} from "../../../shared/validator/validator";
import {BaseFormImplComponent} from "../../../base/component/base-form/base-form-impl.component";
import {
  GetProfessionalUpdateVerificationDetailResponse
} from "../../response/get-professional-update-verification-detail.response";
import {getPropsAsStringArr, withDefault} from "../../../shared/util/helpers";

export abstract class ProfessionalUpdateDetailsBaseComponent extends BaseFormImplComponent {

  public entryView!: GetProfessionalUpdateVerificationDetailResponse;

  protected constructor(protected override formBuilder: FormBuilder) {
    super();
  }

  protected initForm(): void {
    this.fleenHealthForm = this.getFormBuilder().group({
      title: [withDefault(this.entryView.title, DEFAULT_FORM_CONTROL_VALUE),
        [Validators.required, Validators.minLength(1), Validators.maxLength(500), enumTypeValidator(getPropsAsStringArr(this.entryView.professionalTitles))]
      ],
      yearsOfExperience: [withDefault(this.entryView.yearsOfExperience, DEFAULT_FORM_CONTROL_VALUE),
        [Validators.required, Validators.minLength(1), Validators.maxLength(2), isNumberValidator]
      ],
      areaOfExpertise: [withDefault(this.entryView.areaOfExpertise, DEFAULT_FORM_CONTROL_VALUE),
        [Validators.required, Validators.minLength(100), Validators.maxLength(2500)]
      ],
      country: [withDefault(this.entryView.country, DEFAULT_FORM_CONTROL_VALUE),
        [Validators.required, isNumberValidator]
      ],
      languagesSpoken: [withDefault(this.entryView.languagesSpoken, DEFAULT_FORM_CONTROL_VALUE),
        [Validators.required, Validators.maxLength(150)]
      ],
      professionalType: [withDefault(this.entryView.professionalType, DEFAULT_FORM_CONTROL_VALUE),
        [Validators.required, enumTypeValidator(PROFESSIONAL_TYPES)]
      ],
      qualificationType: [withDefault(this.entryView.qualificationType, DEFAULT_FORM_CONTROL_VALUE),
        [Validators.required, enumTypeValidator(PROFESSIONAL_QUALIFICATION_TYPES)]
      ]
    });
    this.formReady();
  }

  public getFormBuilder(): FormBuilder {
    return this.formBuilder;
  }

  get title(): AbstractControl | null | undefined {
    return this.updateDetailsForm?.get('title');
  }

  get yearsOfExperience(): AbstractControl | null | undefined {
    return this.updateDetailsForm?.get('yearsOfExperience');
  }

  get areaOfExpertise(): AbstractControl | null | undefined {
    return this.updateDetailsForm?.get('areaOfExpertise');
  }

  get country(): AbstractControl | null | undefined {
    return this.updateDetailsForm?.get('country');
  }

  get languagesSpoken(): AbstractControl | null | undefined {
    return this.updateDetailsForm?.get('languagesSpoken');
  }

  get professionalType(): AbstractControl | null | undefined {
    return this.updateDetailsForm?.get('professionalType');
  }

  get qualificationType(): AbstractControl | null | undefined {
    return this.updateDetailsForm?.get('qualificationType');
  }

  get updateDetailsForm(): FormGroup {
    return this.fleenHealthForm;
  }
}
