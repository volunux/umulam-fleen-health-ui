export class SearchResultView<T> {

  public pageNo: number;
  public pageSize: number;
  public totalEntries: number;
  public totalPages: number;
  public isLast: boolean;
  public isFirst: boolean;
  public values: T[];

  public constructor(data: SearchResultView<T>) {
    this.pageNo = data?.pageNo ? data.pageNo : data?.pageNo;
    this.pageSize = data?.pageSize ? data.pageSize : data?.pageSize;
    this.totalEntries = data?.totalEntries ? data.totalEntries : data?.totalEntries;
    this.totalPages = data?.totalPages ? data.totalPages : data?.totalPages;
    this.isLast = data?.isLast ? data.isLast : data?.isLast;
    this.isFirst = data?.isFirst ? data.isFirst : data?.isFirst;
    this.values = data?.values ? data.values : [];
  }
}
