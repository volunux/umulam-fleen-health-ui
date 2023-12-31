import {FleenHealthView} from "../../shared/view/fleen-health.view";
import {CountryView} from "../../country/view/country.view";
import {VerificationDocumentView} from "./verification-document.view";
import {manyToType} from "../../shared/util/helpers";
import {MemberView} from "../../member/view/member.view";

export class MemberStatusView extends FleenHealthView {

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

export class ProfessionalView extends FleenHealthView {

  public title: string;
  public type: string;
  public qualification: string;
  public yearsOfExperience: number;
  public areaOfExpertise: string;
  public availabilityStatus: string;
  public languagesSpoken: string;
  public price: string;
  public member: MemberView;
  public country: CountryView;
  public verificationDocuments: VerificationDocumentView[];

  public constructor(data: ProfessionalView) {
    super(data);
    this.title = data?.title ? data.title : data?.title;
    this.type = data?.type ? data.type : data?.type;
    this.qualification = data?.qualification ? data.qualification : data?.qualification;
    this.yearsOfExperience = data?.yearsOfExperience ? data.yearsOfExperience : data?.yearsOfExperience;
    this.areaOfExpertise = data?.areaOfExpertise ? data.areaOfExpertise : data?.areaOfExpertise;
    this.availabilityStatus = data?.availabilityStatus ? data.availabilityStatus : data?.availabilityStatus;
    this.languagesSpoken = data?.languagesSpoken ? data.languagesSpoken : data?.languagesSpoken;
    this.price = data?.price ? data.price : data?.price;
    this.member = data?.member ? new MemberView(data.member) : data?.member;
    this.country = data?.country ? new CountryView(data.country) : data?.country;
    this.verificationDocuments = data?.verificationDocuments ? manyToType(VerificationDocumentView, data.verificationDocuments) : data?.verificationDocuments;
  }
}
