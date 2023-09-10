import {isTruthy} from "../../shared/util/helpers";

export type UpdateProfessionalDetailsDto = {
  title: string;
  yearsOfExperience: string;
  areaOfExpertise: string;
  professionalType: string;
  qualificationType: string;
  languagesSpoken: string;
  country: number;
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
