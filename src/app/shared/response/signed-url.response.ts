
export class SignedUrlResponse {
  public signedUrl: string;

  public constructor(data: SignedUrlResponse) {
    this.signedUrl = data?.signedUrl;
  }
}
