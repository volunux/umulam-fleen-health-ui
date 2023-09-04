import {VerificationType} from "../../shared/enum/authentication.enum";

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

export type UpdatePasswordDto = {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}
