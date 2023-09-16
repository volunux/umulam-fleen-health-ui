import {Component, OnInit} from '@angular/core';
import {ProfessionalService} from "../../service/professional.service";
import {UserVerificationStatusView} from "../../view/user-verification-status.view";
import {ErrorResponse} from "../../../base/response/error-response";
import {ProfileVerificationStatus} from "../../../member/enum/member.enum";
import {isFalsy} from "../../../shared/util/helpers";
import {BaseFormImplComponent} from "../../../base/component/base-form/base-form-impl.component";
import {PROFILE_VERIFICATION_IN_PROGRESS_STATUS} from "../../../shared/constant/other-constant";

@Component({
  selector: 'app-professional-request-verification',
  templateUrl: './professional-request-verification.component.html',
  styleUrls: ['./professional-request-verification.component.css']
})
export class ProfessionalRequestVerificationComponent extends BaseFormImplComponent implements OnInit {

  public statusView!: UserVerificationStatusView;
  public hasRequestedForVerification: boolean = false;

  public constructor(protected professionalService: ProfessionalService) {
    super();
  }

  public ngOnInit(): void {
    this.professionalService.checkVerificationStatus()
      .subscribe({
        next: (result: UserVerificationStatusView): void => {
          this.statusView = result;
        },
        error: (error: ErrorResponse): void => {
          this.handleError(error);
        }
    });
  }

  public requestForVerification(): void {
    if (isFalsy(this.isSubmitting)) {
      this.disableSubmittingAndResetErrorMessage();

      this.professionalService.requestVerification()
        .subscribe({
          error: (error: ErrorResponse): void => {
            this.handleError(error);
          },
          complete: (): void => {
            this.hasRequestedForVerification = true;
            this.statusView.label = PROFILE_VERIFICATION_IN_PROGRESS_STATUS;
            this.enableSubmitting();
          }
      });
    }
  }

  get isVerificationPending(): boolean {
    return this.statusView.status === ProfileVerificationStatus.PENDING
      || this.statusView.status === ProfileVerificationStatus.DISAPPROVED;
  }

}
