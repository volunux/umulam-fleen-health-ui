
export class EntityExistsResponse {

  public exists: boolean = false;
  public timestamp: Date;
  public statusCode: number;

  public constructor(data: EntityExistsResponse) {
    this.exists = data?.exists;
    this.timestamp = data?.timestamp ? new Date(data.timestamp) : new Date();
    this.statusCode = data?.statusCode;
  }
}
