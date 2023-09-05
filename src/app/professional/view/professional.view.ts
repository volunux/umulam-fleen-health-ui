import {FleenHealthView} from "../../shared/view/fleen-health.view";
import {CountryView} from "../../country/view/country.view";
import {VerificationDocumentView} from "./verification-document.view";
import {manyToType} from "../../shared/util/helpers";

class MemberView extends FleenHealthView {

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
