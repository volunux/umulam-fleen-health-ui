import {ProfessionalAvailabilityStatus} from "../enum/professional.enum";
import {ProfessionalAvailabilityView} from "../view/professional-availability.view";

export type UpdateProfessionalDetailsDto = {
  title: string;
  yearsOfExperience: string;
  areaOfExpertise: string;
  professionalType: string;
  qualificationType: string;
  languagesSpoken: string;
  country: number;
}

export type UpdateProfessionalAvailabilityStatusDto = {
  availabilityStatus: ProfessionalAvailabilityStatus;
}

export type PeriodDto = {
  dayOfTheWeek: string
  startTime: string;
  endTime: string;
}

export class UploadProfessionalDocumentDto {

  public curriculumVitae: string;
  public transcript: string;
  public professionalMembership: string;
  public educationCertificate: string;

  public constructor(data: UploadProfessionalDocumentDto) {
    this.curriculumVitae = data?.curriculumVitae ? data.curriculumVitae : data?.curriculumVitae;
    this.transcript = data?.transcript ? data.transcript : data?.transcript;
    this.professionalMembership = data?.professionalMembership ? data.professionalMembership : data?.professionalMembership;
    this.educationCertificate = data?.educationCertificate ? data.educationCertificate : data?.educationCertificate;
  }
}


export type UpdateProfessionalAvailabilityDto = {
  periods: PeriodDto[] | ProfessionalAvailabilityView[];
}
