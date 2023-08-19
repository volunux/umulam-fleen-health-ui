export type VERIFICATION_TYPE = 'EMAIL' | 'PHONE';

export type VerificationCodeDto = {
  code: string,
  verificationType: VERIFICATION_TYPE
}
