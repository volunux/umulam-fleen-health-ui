import {MfaType} from "../../shared/type/authentication";
import {SignInUpResponse} from "./sign-in-up-response";

export class SignInResponse extends SignInUpResponse {

  private mfaType: MfaType;
  private mfaEnabled; boolean;

  public constructor(data: any) {
    super(data);
    this.mfaType = data.mfaType;
  }
}
