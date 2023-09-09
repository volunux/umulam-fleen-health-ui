import {Component, OnInit} from '@angular/core';
import {ProfessionalService} from "../../service/professional.service";
import {
  GetProfessionalUpdateVerificationDetailResponse
} from "../../response/get-professional-update-verification-detail.response";
import {ErrorResponse} from "../../../base/response/error-response";
import {CountryView} from "../../../country/view/country.view";
import {FormBuilder} from "@angular/forms";
import {ProfessionalUpdateDetailsBaseComponent} from "./professional-update-details-base.component";
import {PROFESSIONAL_QUALIFICATION_TYPES, PROFESSIONAL_TYPES} from "../../../shared/constant/enum-constant";
import {ProfessionalTitleView} from "../../view/professional-title.view";
import {isFalsy, isTruthy} from "../../../shared/util/helpers";
import {ProfessionalView} from "../../view/professional.view";

@Component({
  selector: 'app-professional-update-details',
  templateUrl: './professional-update-details.component.html',
  styleUrls: ['./professional-update-details.component.css']
})
export class ProfessionalUpdateDetailsComponent extends ProfessionalUpdateDetailsBaseComponent implements OnInit {

  public constructor(protected professionalService: ProfessionalService,
                     formBuilder: FormBuilder) {
    super(formBuilder);
  }

  public ngOnInit(): void {
    this.professionalService.getUpdateVerificationDetails()
      .subscribe({
        next: (result: GetProfessionalUpdateVerificationDetailResponse): void => {
          this.entryView = result;
          this.initForm();
        },
        error: (error: ErrorResponse): void => {
          console.log(error);
        }
    });
  }

  public updateDetails(): void {
    if (isFalsy(this.isSubmitting) && isTruthy(this.updateDetailsForm) && this.updateDetailsForm.valid) {
      this.disableSubmitting();
      this.professionalService.updateVerificationDetails(this.updateDetailsForm.value)
        .subscribe({
          next: (result: ProfessionalView): void => {
            console.log(result);
          },
          error: (error: ErrorResponse): void => {
            this.handleError(error);
          },
          complete: (): void => {
            this.enableSubmitting();
          }
      });
    }
  }

  get countries(): CountryView[] {
    return this.entryView.countries;
  }

  get professionalTypes(): string[] {
    return PROFESSIONAL_TYPES;
  }

  get qualificationTypes(): string [] {
    return PROFESSIONAL_QUALIFICATION_TYPES;
  }

  get professionalTitles(): ProfessionalTitleView[] {
    return this.entryView.professionalTitles;
  }

}
