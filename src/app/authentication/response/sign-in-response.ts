import {SignInUpResponse} from "./sign-in-up-response";
import {MfaType} from "../../shared/enum/authentication";

export class SignInResponse extends SignInUpResponse {

  private mfaType: MfaType;
  private mfaEnabled; boolean;

  public constructor(data: any) {
    super(data);
    this.mfaType = data.mfaType;
  }
}
