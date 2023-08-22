export class ForgotPasswordResponse {

  public emailAddress: string;
  public phoneNumber: string;

  public constructor(data: any) {
    this.emailAddress = data.emailAddress;
    this.phoneNumber = data.phoneNumber;
  }
}
