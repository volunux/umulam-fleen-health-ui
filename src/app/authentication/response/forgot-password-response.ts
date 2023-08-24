export class ForgotPasswordResponse {

  public emailAddress: string;
  public phoneNumber: string;

  public constructor(data: ForgotPasswordResponse) {
    this.emailAddress = data.emailAddress;
    this.phoneNumber = data.phoneNumber;
  }
}
