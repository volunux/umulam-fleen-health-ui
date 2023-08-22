export class InitiatePasswordChangeResponse {

  public accessToken: string;

  public constructor(data: any) {
    this.accessToken = data.accessToken;
  }
}
