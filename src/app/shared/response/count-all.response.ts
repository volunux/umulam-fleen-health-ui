export class CountAllResponse {

  public total!: number;

  public constructor(data: CountAllResponse) {
    this.total = data.total;
  }
}
