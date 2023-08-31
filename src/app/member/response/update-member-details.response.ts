
export class UpdateMemberDetailsResponse {

  public firstName: string;
  public lastName: string;
  public address: string;
  public gender: string;
  public dateOfBirth: Date;

  public constructor(data: UpdateMemberDetailsResponse) {
    this.firstName = data?.firstName;
    this.lastName = data?.lastName;
    this.address = data?.address;
    this.gender = data?.gender;
    this.dateOfBirth = data?.dateOfBirth ? new Date(data.dateOfBirth) : new Date();
  }
}
