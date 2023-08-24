export class InitiatePasswordChangeResponse {

  public accessToken: string;

  public constructor(data: InitiatePasswordChangeResponse) {
    this.accessToken = data.accessToken;
  }
}
