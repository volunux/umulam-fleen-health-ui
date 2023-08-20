import {AuthenticationStatus, MfaType, NextAuthentication} from "../../shared/type/authentication";

export class SignInResponse {

  private accessToken: string;
  private refreshToken: string;
  private emailAddress: string;
  private phoneNumber: string;
  private authenticationStatus: AuthenticationStatus;
  private mfaType: MfaType;
  private mfaEnabled; boolean;
  private nextAuthentication: NextAuthentication;

  public constructor(data: any) {
    this.accessToken = data.accessToken;
    this.refreshToken = data.refreshToken;
    this.emailAddress = data.emailAddress;
    this.phoneNumber = data.phoneNumber;
    this.authenticationStatus = data.authenticationStatus;
    this.mfaType = data.mfaType;
    this.mfaEnabled = data.mfaEnabled;
    this.nextAuthentication = data.nextAuthentication;
  }
}
