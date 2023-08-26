import {DEFAULT_PAGE_SIZE} from "../../constant/other-constant";
import {AnyProp} from "../../type/base";
import {isFalsy, isTruthy} from "../../util/helpers";
import {ActivatedRoute, Router} from "@angular/router";
import {SearchResultView} from "../../view/search-result.view";
import {Observable} from "rxjs";
import {SearchDto} from "../../interface/base";
import {BaseFormComponent} from "../../../base/component/base-form/base-form.component";
import {DeleteIdsDto} from "../../type/other";
import {SearchFilter} from "../../type/search";

export abstract class BaseEntriesComponent<T> extends BaseFormComponent {

  public currentPage: number = 0;
  public pageSize: number = DEFAULT_PAGE_SIZE;
  public isFirst: boolean | undefined;
  public isLast: boolean | undefined;
  public entries: T[] = [];
  private deleteIds: Array<number | string> = [];
  private totalEntries: number = 0;
  protected searchParams: AnyProp = {};
  protected searchFilter: SearchFilter[] = [];

  protected constructor(private router: Router, private route: ActivatedRoute) {
    super();
  }

  abstract findEntries(params: AnyProp): Observable<SearchResultView<T>>;

  abstract deleteEntries(dto: DeleteIdsDto): Observable<any>;

  public trackByFn(index: number, item: any): any {
    return item.id;
  }

  public handleChecked(id: number | string, checked: boolean): void {
    if (checked && !this.deleteIds.includes(id)) {
      this.deleteIds.push(id);
    } else {
      this.deleteIds = this.deleteIds
        .filter((val: number | string) => val !== id);
    }
  }

  public async updateEntry(id: number | string | undefined): Promise<void> {
    if (isTruthy(id)) {
      await this.router.navigate(['update', id], {relativeTo: this.route});
    }
  }

  public async viewDetail(id: number | string | undefined): Promise<void> {
    if (isTruthy(id)) {
      await this.router.navigate(['detail', id], {relativeTo: this.route});
    }
  }

  private isNextPageAvailable(): boolean {
    const totalPages: number = Math.ceil( this.totalEntries / this.pageSize);
    return this.currentPageNumber < totalPages;
  }

  private initResult(result: SearchResultView<any>): void {
    this.isFirst = result.isFirst;
    this.isLast = result.isLast;
    this.entries = result.values;
    this.totalEntries = result.totalEntries;
  }

  private getPaginationDetails(): AnyProp {
    return {
      pageNo: this.currentPage,
      pageSize: this.pageSize
    }
  }

  private prepareSearchParams(): AnyProp {
    return {
      ...(this.searchParams),
      ...(this.getPaginationDetails())
    }
  }

  public nextPage(): void {
    if (this.entries && !this.isLast && this.isNextPageAvailable()) {
      this.currentPage++;
      this.getEntries();
    }
  }

  public previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getEntries();
    }
  }

  get currentPageNumber(): number {
    return this.currentPage + 1;
  }

  private getEntries(): void {
    const params: AnyProp = this.prepareSearchParams();
    this.findEntries(params)
      .subscribe({
        next: (result: SearchResultView<T>): void => {
          this.initResult(result);
        },
        error: (): void => {
          this.entries = [];
          this.enableSubmitting();
        },
        complete: (): void => {
          this.enableSubmitting();
        }
      });
  }

  public search(dto: SearchDto): void {
    this.searchParams = dto;
    this.getEntries();
  }

  public confirmDeleteEntries(): void {
    if (this.deleteIds.length > 0 && isFalsy(this.isSubmitting)) {
      this.disableSubmitting();
      const dto: DeleteIdsDto = { ids: this.deleteIds };
      this.deleteEntries(dto)
        .subscribe({
          error: (): void => {
            this.enableSubmitting();
          },
          complete: (): void => {
            this.enableSubmitting();
            this.refreshEntries();
          }
      });
    }
  }

  private refreshEntries(): void {
    this.entries = this.entries
      .filter((entry: T) => !this.deleteIds.includes(entry['id']))
  }

}
