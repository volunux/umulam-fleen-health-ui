export type SignInDto = {
  emailAddress: string;
  password: string;
}

export type SignUpDto = {
  profileType: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  emailAddress: string;
  phoneNumber: string;
  gender: string;
  password: string;
  confirmPassword: string;
  verificationType: string;
}

