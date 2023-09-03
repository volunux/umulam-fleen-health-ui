export class GetMemberUpdateDetailsResponse {

  public firstName: string;
  public lastName: string;
  public emailAddress: string;
  public phoneNumber: string;
  public gender: string;
  public dateOfBirth: Date;
  public address: string;
  public profilePhoto: string;

  public constructor(data: GetMemberUpdateDetailsResponse) {
    this.firstName = data?.firstName;
    this.lastName = data?.lastName;
    this.emailAddress = data?.emailAddress;
    this.phoneNumber = data?.phoneNumber;
    this.gender = data?.gender;
    this.dateOfBirth = data?.dateOfBirth ? new Date(data.dateOfBirth) : new Date();
    this.address = data?.address;
    this.profilePhoto = data?.profilePhoto;
  }
}
