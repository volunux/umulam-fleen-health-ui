import {AuthVerificationType, ChangePasswordType, VerificationType} from "../enum/authentication.enum";
import {MfaType} from "../../mfa/enum/mfa.enum";

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

