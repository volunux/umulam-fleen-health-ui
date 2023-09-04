export enum AuthenticationStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}



export enum NextAuthentication {
  PRE_VERIFICATION = 'PRE_VERIFICATION',
  PRE_ONBOARDED = 'PRE_ONBOARDED',
  MFA_OR_PRE_AUTHENTICATION = 'MFA_OR_PRE_AUTHENTICATION',
  NONE = 'NONE'
}

export enum VerificationType {
  EMAIL = 'EMAIL',
  PHONE = 'PHONE'
}

export enum AuthVerificationType {
  MFA = 'MFA',
  VERIFICATION = 'VERIFICATION',
  ONBOARDING = 'ONBOARDING'
}

export enum ChangePasswordType {
  NONE = 'NONE',
  RESET = 'RESET',
  ONBOARDING = 'ONBOARDING',
  UPDATE = 'UPDATE'
}
