import {CountryView} from "../../country/view/country.view";
import {ProfessionalTitleView} from "../view/professional-title.view";
import {manyToType} from "../../shared/util/helpers";

export class GetProfessionalUpdateVerificationDetailResponse {

  public title: string;
  public yearsOfExperience: string;
  public areaOfExpertise: string;
  public professionalType: string;
  public qualificationType: string;
  public languagesSpoken: string;
  public country: number;

  public countries: CountryView[];
  public professionalTitles: ProfessionalTitleView[];

  public constructor(data: GetProfessionalUpdateVerificationDetailResponse) {
    this.title = data?.title;
    this.yearsOfExperience = data?.yearsOfExperience;
    this.areaOfExpertise = data?.areaOfExpertise;
    this.professionalType = data?.professionalType;
    this.qualificationType = data?.qualificationType;
    this.languagesSpoken = data?.languagesSpoken;
    this.country = data?.country;

    this.countries = data?.countries ? manyToType(CountryView, data.countries) : [];
    console.log(data?.professionalTitles);
    this.professionalTitles = data?.professionalTitles ? manyToType(ProfessionalTitleView, data.professionalTitles) : [];
  }
}
