
export class MfaStatusResponse {

  public enabled: boolean;
  public mfaType: string;

  public constructor(data: MfaStatusResponse) {
    this.enabled = data?.enabled;
    this.mfaType = data?.mfaType;
  }
}
