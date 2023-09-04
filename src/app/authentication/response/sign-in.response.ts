import {SignInUpResponse} from "./sign-in-up.response";
import {MfaType} from "../../mfa/enum/mfa.enum";

export class SignInResponse extends SignInUpResponse {

  public mfaType: MfaType;
  public mfaEnabled: boolean;

  public constructor(data: SignInResponse) {
    super(data);
    this.mfaType = data?.mfaType;
    this.mfaEnabled = data?.mfaEnabled;
  }
}
