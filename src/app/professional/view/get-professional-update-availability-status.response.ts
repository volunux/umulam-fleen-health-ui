import {ProfessionalAvailabilityStatus} from "../enum/professional.enum";

export class GetProfessionalUpdateAvailabilityStatusResponse {

  public availabilityStatus: ProfessionalAvailabilityStatus;

  public constructor(data: GetProfessionalUpdateAvailabilityStatusResponse) {
    this.availabilityStatus = data?.availabilityStatus;
  }
}
