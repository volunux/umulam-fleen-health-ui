import {MfaType} from "../enum/mfa.enum";

export class MfaStatusResponse {

  public enabled: boolean;
  public mfaType: MfaType;

  public constructor(data: MfaStatusResponse) {
    this.enabled = data?.enabled;
    this.mfaType = data?.mfaType;
  }
}
