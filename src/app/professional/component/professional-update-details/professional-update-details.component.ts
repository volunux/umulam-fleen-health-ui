import {Component, OnInit} from '@angular/core';
import {ProfessionalService} from "../../service/professional.service";
import {
  GetProfessionalUpdateVerificationDetailResponse
} from "../../response/get-professional-update-verification-detail.response";
import {ErrorResponse} from "../../../base/response/error-response";
import {CountryView} from "../../../country/view/country.view";
import {FormBuilder} from "@angular/forms";
import {ProfessionalUpdateDetailsBaseComponent} from "./professional-update-details-base.component";
import {PROFESSIONAL_TYPES} from "../../../shared/constant/enum-constant";
import {capitalize} from "../../../shared/util/helpers";

@Component({
  selector: 'app-professional-update-details',
  templateUrl: './professional-update-details.component.html',
  styleUrls: ['./professional-update-details.component.css']
})
export class ProfessionalUpdateDetailsComponent extends ProfessionalUpdateDetailsBaseComponent implements OnInit {

  public entryView!: GetProfessionalUpdateVerificationDetailResponse;

  public constructor(protected professionalService: ProfessionalService,
                     formBuilder: FormBuilder) {
    super(formBuilder);
  }

  public ngOnInit(): void {
    this.professionalService.getUpdateVerificationDetails()
      .subscribe({
        next: (result: GetProfessionalUpdateVerificationDetailResponse): void => {
          this.entryView = result;
        },
        error: (error: ErrorResponse): void => {
          console.log(error);
        }
      })
  }

  get countries(): CountryView[] {
    return this.entryView.countries;
  }

  get professionalTypes(): string[] {
    return PROFESSIONAL_TYPES;
  };

  protected readonly capitalize = capitalize;
}
