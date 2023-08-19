export type VERIFICATION_TYPE = 'EMAIL' | 'PHONE';

export type VerificationCodeDto = {
  code: string;
  verificationType: VERIFICATION_TYPE;
}

export type ResendVerificationCodeDto = {
  emailAddress?: string;
  phoneNumber?: string;
  verificationType: VERIFICATION_TYPE
}
