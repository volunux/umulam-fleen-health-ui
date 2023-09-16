import {ProfessionalAvailabilityStatus} from "../../professional/enum/professional.enum";

export class ProfessionalCheckAvailabilityResponse {

  public available: boolean;
  public availabilityName: ProfessionalAvailabilityStatus;
  public timestamp: Date;
  public statusCode: number;

  public constructor(data: ProfessionalCheckAvailabilityResponse) {
    this.available = data?.available ? data.available : data?.available;
    this.availabilityName = data?.availabilityName ? data.availabilityName : data?.availabilityName;
    this.timestamp = data?.timestamp ? new Date(data.timestamp) : data?.timestamp;
    this.statusCode = data?.statusCode ? data.statusCode : data?.statusCode;
  }
}
