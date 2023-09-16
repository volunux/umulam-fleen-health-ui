
export class ProfessionalCheckAvailabilityResponse {

  public available: boolean;
  public timestamp: Date;
  public statusCode: number;

  public constructor(data: ProfessionalCheckAvailabilityResponse) {
    this.available = data?.available ? data.available : data?.available;
    this.timestamp = data?.timestamp ? new Date(data.timestamp) : data?.timestamp;
    this.statusCode = data?.statusCode ? data.statusCode : data?.statusCode;
  }
}
