export type VerificationType = 'EMAIL' | 'PHONE';

export type VerificationCodeDto = {
  code: string;
  verificationType: VerificationType;
}

export type ResendVerificationCodeDto = {
  emailAddress?: string;
  phoneNumber?: string;
  verificationType: VerificationType
}

export type AuthenticationStatus = 'IN_PROGRESS' | 'COMPLETED';
export type MfaType = 'SMS' | 'EMAIL' | 'AUTHENTICATION' | 'NONE';
export type NextAuthentication = 'PRE_VERIFICATION' | 'PRE_ONBOARDED' | 'MFA_OR_PRE_AUTHENTICATION' | 'NONE';
