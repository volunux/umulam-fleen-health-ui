export class UpdateEmailAddressOrPhoneNumberResponse {
  public emailAddress: string;
  public phoneNumber: string;
  public message: string;
  public timestamp: Date;
  public statusCode: number;

  public constructor(data: UpdateEmailAddressOrPhoneNumberResponse) {
    this.emailAddress = data?.emailAddress;
    this.phoneNumber = data?.phoneNumber;
    this.message = data?.message;
    this.timestamp = data?.timestamp ? new Date(data.timestamp) : new Date();
    this.statusCode = data?.statusCode;
  }

}
