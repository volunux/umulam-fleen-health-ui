import {AuthenticationStatus, NextAuthentication} from "../../shared/enum/authentication";

export class SignInUpResponse {

  public accessToken: string;
  public refreshToken: string;
  public emailAddress: string;
  public phoneNumber: string;
  public authenticationStatus: AuthenticationStatus;
  public nextAuthentication: NextAuthentication;

  public constructor(data: SignInUpResponse) {
    this.accessToken = data?.accessToken;
    this.refreshToken = data?.refreshToken;
    this.emailAddress = data?.emailAddress;
    this.phoneNumber = data?.phoneNumber;
    this.authenticationStatus = data?.authenticationStatus;
    this.nextAuthentication = data?.nextAuthentication;
  }
}
