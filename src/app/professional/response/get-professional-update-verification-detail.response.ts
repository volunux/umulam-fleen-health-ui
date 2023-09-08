import {CountryView} from "../../country/view/country.view";
import {ProfessionalTitleView} from "../view/professional-title.view";

export class GetProfessionalUpdateVerificationDetailResponse {

  public countries: CountryView[];
  public professionalTitles: ProfessionalTitleView[];

  public constructor(data: GetProfessionalUpdateVerificationDetailResponse) {
    this.countries = data?.countries ? data.countries : [];
    this.professionalTitles = data?.professionalTitles ? data.professionalTitles : [];
  }
}
