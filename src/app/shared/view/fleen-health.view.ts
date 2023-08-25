
export class FleenHealthView {

  public id: number | null;
  public createdOn: Date | null;
  public updatedOn: Date | null;

  public constructor(data: FleenHealthView) {
    this.id = data?.id ? data?.id : null;
    this.createdOn = data?.createdOn ? new Date(data?.createdOn) : null;
    this.updatedOn = data?.updatedOn ? new Date(data?.updatedOn) : null;
  }
}
