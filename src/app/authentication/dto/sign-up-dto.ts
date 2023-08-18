export class SignUpDto {

  public profileType: string | undefined;
  public firstName: string | undefined;
  public lastName: string | undefined;
  public dateOfBirth: string | undefined;
  public emailAddress: string | undefined;
  public phoneNumber: string | undefined;
  public gender: string | undefined;
  public password: string | undefined;
  public confirmPassword: string | undefined;
  public verificationType: string | undefined;


  public constructor() {
    this.verificationType = "EMAIL";
  }

}
