export class SignUpDto {

  public profile_type: string | undefined;
  public first_name: string | undefined;
  public last_name: string | undefined;
  public date_of_birth: string | undefined;
  public email_address: string | undefined;
  public phone_number: string | undefined;
  public gender: string | undefined;
  public password: string | undefined;
  public confirm_password: string | undefined;
  public verification_type: string | undefined;


  public constructor(data: SignUpDto) {
    this.profile_type = data.profile_type;
    this.verification_type = "EMAIL";
  }

}
