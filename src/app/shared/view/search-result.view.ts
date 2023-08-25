export class SearchResultView<T> {

  public pageNo: number | null;
  public pageSize: number | null;
  public totalEntries: number | null;
  public totalPages: number | null;
  public isLast: boolean | null;
  public isFirst: boolean | null;
  public values: T[];

  public constructor(data: SearchResultView<T>) {
    this.pageNo = data?.pageNo ? data.pageNo : null;
    this.pageSize = data?.pageSize ? data.pageSize : null;
    this.totalEntries = data?.totalEntries ? data.totalEntries : null;
    this.totalPages = data?.totalPages ? data.totalPages : null;
    this.isLast = data?.isLast ? data.isLast : null;
    this.isFirst = data?.isFirst ? data.isFirst : null;
    this.values = data?.values ? data.values : [];
  }
}
