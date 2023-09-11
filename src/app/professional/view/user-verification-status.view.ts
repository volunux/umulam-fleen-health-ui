import {ProfileVerificationStatus} from "../../member/enum/member.enum";

export class UserVerificationStatusView {

  public status: ProfileVerificationStatus;
  public label: string;
  public timestamp: Date;

  public constructor(data: UserVerificationStatusView) {
    this.status = data?.status;
    this.label = data?.label;
    this.timestamp = data?.timestamp ? new Date(data.timestamp) : new Date();
  }
}
