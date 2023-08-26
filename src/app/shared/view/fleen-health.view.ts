
export class FleenHealthView {

  public id: number | undefined;
  public createdOn: Date;
  public updatedOn: Date;

  public constructor(data?: FleenHealthView) {
    this.id = data?.id ? data.id : data?.id;
    this.createdOn = data?.createdOn ? new Date(data.createdOn) : new Date();
    this.updatedOn = data?.updatedOn ? new Date(data.updatedOn) : new Date;
  }
}
