export class FleenHealthResponse {

  public message: string;
  public timestamp: Date;
  public statusCode: number;

  public constructor(data: FleenHealthResponse) {
    this.message = data.message;
    this.timestamp = data.timestamp;
    this.statusCode = data.statusCode;
  }
}
