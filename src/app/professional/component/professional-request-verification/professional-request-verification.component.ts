import {Component, OnInit} from '@angular/core';
import {BaseFormComponent} from "../../../base/component/base-form/base-form.component";
import {BaseComponent} from "../../../base/component/base/base.component";
import {ProfessionalService} from "../../service/professional.service";
import {UserVerificationStatusView} from "../../view/user-verification-status.view";
import {ErrorResponse} from "../../../base/response/error-response";

@Component({
  selector: 'app-professional-request-verification',
  templateUrl: './professional-request-verification.component.html',
  styleUrls: ['./professional-request-verification.component.css']
})
export class ProfessionalRequestVerificationComponent extends BaseComponent implements OnInit {

  public constructor(protected professionalService: ProfessionalService) {
    super();
  }

  public ngOnInit(): void {
    this.professionalService.checkVerificationStatus()
      .subscribe({
        next: (result: UserVerificationStatusView): void => {

        },
        error: (error: ErrorResponse): void => {
        }
    });
  }


}
