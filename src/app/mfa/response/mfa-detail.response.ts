import {MfaSetupStatus, MfaType} from "../enum/mfa.enum";

export class MfaDetailResponse {

  public enabled: boolean;
  public secret: string;
  public qrCode: string;
  public mfaType: MfaType;
  public mfaSetupStatus: MfaSetupStatus;
  public emailAddress: string;
  public phoneNumber: string;

  public constructor(data: MfaDetailResponse) {
    this.enabled = data?.enabled;
    this.secret = data?.secret;
    this.qrCode = data?.qrCode;
    this.mfaType = data?.mfaType;
    this.mfaSetupStatus = data?.mfaSetupStatus;
    this.emailAddress = data?.emailAddress;
    this.phoneNumber = data?.phoneNumber;
  }
}
