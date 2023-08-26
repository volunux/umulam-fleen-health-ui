import {AuthVerificationType, ChangePasswordType, MfaType, VerificationType} from "../enum/authentication";

export type AuthVerificationDto = {
  code: string;
  verificationType?: VerificationType;
  mfaType?: MfaType
  type: AuthVerificationType
}

export type ResendVerificationCodeDto = {
  emailAddress?: string;
  phoneNumber?: string;
  verificationType: VerificationType
}

export type ChangePasswordDto = {
  password: string;
  confirmPassword: string;
  type: ChangePasswordType
}

export type ForgotPasswordDto = {
  emailAddress: string;
  verificationType: VerificationType
}

export type ResetPasswordDto = {
  emailAddress: string;
  code: string;
}

export type SearchParamDto = {
  type: string;
  value: string;
}

export type SearchFilter = {
  key: string;
  label: string;
  type?: string;
}
