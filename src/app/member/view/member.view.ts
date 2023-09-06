import {FleenHealthView} from "../../shared/view/fleen-health.view";
import {MfaType} from "../../mfa/enum/mfa.enum";
import {MemberStatusView} from "../../professional/view/professional.view";
import {Gender, UserType} from "../enum/member.enum";

export class MemberView extends FleenHealthView {

  public firstName: string;
  public lastName: string;
  public emailAddress: string;
  public phoneNumber: string;
  public profilePhoto: string;
  public mfaEnabled: boolean | null;
  public mfaType: MfaType;
  public profileVerificationStatus: string;
  public userType: UserType;
  public gender: Gender;
  public dateOfBirth: Date;
  public emailAddressVerified: boolean;
  public phoneNumberVerified: boolean;
  public memberStatus: MemberStatusView;

  public constructor(data: MemberView) {
    super(data);
    this.firstName = data?.firstName;
    this.lastName = data?.lastName;
    this.emailAddress = data?.emailAddress;
    this.phoneNumber = data?.phoneNumber;
    this.profilePhoto = data?.profilePhoto;
    this.mfaEnabled = data?.mfaEnabled;
    this.mfaType = data?.mfaType;
    this.profileVerificationStatus = data?.profileVerificationStatus;
    this.userType = data?.userType;
    this.gender = data?.gender;
    this.dateOfBirth = data?.dateOfBirth ? new Date(data.dateOfBirth) : new Date();
    this.emailAddressVerified = data?.emailAddressVerified;
    this.phoneNumberVerified = data?.phoneNumberVerified;
    this.memberStatus = data?.memberStatus ? new MemberStatusView(data.memberStatus) : data?.memberStatus;
  }

}
