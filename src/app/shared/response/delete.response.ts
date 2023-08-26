export class DeleteResponse {

  public message: string;
  public timestamp: Date;
  public statusCode: number;

  public constructor(data: DeleteResponse) {
    this.message = data.message;
    this.timestamp = data.timestamp;
    this.statusCode = data.statusCode;
  }
}
