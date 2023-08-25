
export class FleenHealthView {

  private id: number | null;
  private createdOn: Date | null;
  private updatedOn: Date | null;

  public constructor(data: FleenHealthView) {
    this.id = data?.id ? data?.id : null;
    this.createdOn = data?.createdOn ? new Date(data?.createdOn) : null;
    this.updatedOn = data?.updatedOn ? new Date(data?.updatedOn) : null;
  }
}
