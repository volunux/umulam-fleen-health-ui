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

export type ConfirmUpdateEmailAddressDto = {
  emailAddress: string;
  code: string;
}

export type ConfirmUpdatePhoneNumberDto = {
  phoneNumber: string;
  code: string;
}

export type UpdateProfilePhotoDto = {
  profilePhoto: string;
}
