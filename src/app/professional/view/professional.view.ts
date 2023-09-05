import {FleenHealthView} from "../../shared/view/fleen-health.view";
import {CountryView} from "../../country/view/country.view";
import {VerificationDocumentView} from "./verification-document.view";
import {manyToType} from "../../shared/util/helpers";
import {MfaType} from "../../mfa/enum/mfa.enum";

enum UserType {
  USER = 'USER',
  PROFESSIONAL = 'PROFESSIONAL',
  BUSINESS = 'BUSINESS'
}

enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

class MemberStatusView extends FleenHealthView {

  public title;
  public code;
  public description;

  public constructor(data: MemberStatusView) {
    super(data);
    this.title = data?.title;
    this.code = data?.code;
    this.description = data?.description;
  }
}

class MemberView extends FleenHealthView {

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

export class ProfessionalView extends FleenHealthView {

  public title: string;
  public type: string;
  public qualification: string;
  public yearsOfExperience: number;
  public areaOfExpertise: string;
  public availabilityStatus: string;
  public languagesSpoken: string;
  public member: MemberView;
  public country: CountryView;
  public verificationDocuments: VerificationDocumentView[];

  public constructor(data: ProfessionalView) {
    super(data);
    this.title = data?.title;
    this.type = data?.type;
    this.qualification = data?.qualification;
    this.yearsOfExperience = data?.yearsOfExperience;
    this.areaOfExpertise = data?.areaOfExpertise;
    this.availabilityStatus = data?.availabilityStatus;
    this.languagesSpoken = data?.languagesSpoken;
    this.member = data?.member ? new MemberView(data.member) : data?.member;
    this.country = data?.country ? new CountryView(data.country) : data?.country;
    this.verificationDocuments = data?.verificationDocuments ? manyToType(VerificationDocumentView, data.verificationDocuments) : data?.verificationDocuments;
  }
}
