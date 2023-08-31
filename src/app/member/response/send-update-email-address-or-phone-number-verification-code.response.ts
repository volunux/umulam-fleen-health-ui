
export class SendUpdateEmailAddressOrPhoneNumberVerificationCodeResponse {

  public message: string;
  public timestamp: Date;

  public constructor(data: SendUpdateEmailAddressOrPhoneNumberVerificationCodeResponse) {
    this.message = data?.message;
    this.timestamp = data?.timestamp ? new Date(data?.timestamp) : new Date();
  }
}
