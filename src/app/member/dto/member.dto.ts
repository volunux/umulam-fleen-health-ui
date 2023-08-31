import {VerificationType} from "../../shared/enum/authentication";

export type UpdateEmailAddressOrPhoneNumberDto = {
  verificationType: VerificationType;
}

export type UpdateMemberDetailsDto = {
  firstName: string;
  lastName: string;
  address: string;
  gender: string;
  dateOfBirth: string;
}
