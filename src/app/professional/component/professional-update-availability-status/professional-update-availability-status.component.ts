import {Component, OnInit} from '@angular/core';
import {BaseFormImplComponent} from "../../../base/component/base-form/base-form-impl.component";
import {ProfessionalService} from "../../service/professional.service";
import {
  GetProfessionalUpdateAvailabilityStatusResponse
} from "../../response/get-professional-update-availability-status.response";
import {ErrorResponse} from "../../../base/response/error-response";
import {ProfessionalAvailabilityStatus} from "../../enum/professional.enum";
import {FleenHealthResponse} from "../../../shared/response/fleen-health.response";

@Component({
  selector: 'app-professional-update-availability-status',
  templateUrl: './professional-update-availability-status.component.html',
  styleUrls: ['./professional-update-availability-status.component.css']
})
export class ProfessionalUpdateAvailabilityStatusComponent extends BaseFormImplComponent implements OnInit {

  public availability!: GetProfessionalUpdateAvailabilityStatusResponse;
  protected readonly ProfessionalAvailabilityStatus = ProfessionalAvailabilityStatus;

  public constructor(protected professionalService: ProfessionalService) {
    super();
  }

  public ngOnInit(): void {
    this.professionalService.getAvailabilityStatus()
      .subscribe({
        next: (result: GetProfessionalUpdateAvailabilityStatusResponse): void => {
          this.availability = result;
        },
        error: (error: ErrorResponse): void => {
          this.handleError(error);
        }
    });
  }

  public updateAvailabilityStatus(availabilityStatus: ProfessionalAvailabilityStatus): void {
    this.professionalService.updateAvailabilityStatus({ availabilityStatus })
      .subscribe({
        next: (result: FleenHealthResponse): void => {
          this.statusMessage = result.message;
          this.toggleAvailability(availabilityStatus);
        },
        error: (error: ErrorResponse): void => {
          this.handleError(error);
        },
    });
  }

  private toggleAvailability(availabilityStatus: ProfessionalAvailabilityStatus): void {
    this.availability.availabilityStatus = availabilityStatus;
  }

}
