import {DEFAULT_PAGE_SIZE} from "../../../shared/constant/other-constant";
import {AnyProp} from "../../../shared/type/base";
import {isFalsy, isTruthy} from "../../../shared/util/helpers";
import {ActivatedRoute, Navigation, Params, Router} from "@angular/router";
import {SearchResultView} from "../../../shared/view/search-result.view";
import {Observable} from "rxjs";
import {SearchDto} from "../../../shared/interface/base";
import {BaseFormComponent} from "../base-form/base-form.component";
import {DeleteIdsDto} from "../../../shared/type/other";
import {SearchFilter} from "../../../shared/type/search";
import {Location} from "@angular/common";

export abstract class BaseEntriesComponent<T> extends BaseFormComponent {

  public currentPage: number = 1;
  public pageSize: number = DEFAULT_PAGE_SIZE;
  public isFirst: boolean | undefined;
  public isLast: boolean | undefined;
  public entries: T[] = [];
  private deleteIds: Array<number | string> = [];
  private totalEntries: number = 0;
  protected searchParams: AnyProp = {};
  protected searchFilter: SearchFilter[] = [];

  protected constructor(protected router: Router, protected route: ActivatedRoute, protected location: Location) {
    super();
    this.initRouteState(this.router.getCurrentNavigation());
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
      await this.router.navigate(['..', 'update', id], {relativeTo: this.route});
    }
  }

  public async viewDetail(id: number | string | undefined): Promise<void> {
    if (isTruthy(id)) {
      await this.router.navigate(['..', 'detail', id], {relativeTo: this.route});
    }
  }

  private isNextPageAvailable(): boolean {
    const totalPages: number = Math.ceil( this.totalEntries / this.pageSize);
    return this.currentPage < totalPages;
  }

  private initResult(result: SearchResultView<any>): void {
    this.isFirst = result.isFirst;
    this.isLast = result.isLast;
    this.entries = result.values;
    this.totalEntries = result.totalEntries;
  }

  private getPaginationDetails(): AnyProp {
    return {
      pageNo: this.currentPage - 1,
      pageSize: this.pageSize
    }
  }

  private prepareSearchParams(): AnyProp {
    return {
      ...(this.searchParams),
      ...(this.getPaginationDetails())
    }
  }

  public async nextPage(): Promise<void> {
    if (this.entries && !this.isLast && this.isNextPageAvailable()) {
      this.currentPage++;
      await this.updateUrlWithPage();
      this.getEntries();
    }
  }

  public async previousPage(): Promise<void> {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getEntries();
    }
  }

  protected getEntries(): void {
    const params: AnyProp = this.prepareSearchParams();
    this.disableSubmitting();
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
            this.resetDeleteIds();
          }
      });
    }
  }

  private refreshEntries(): void {
    this.entries = this.entries
      .filter((entry: T) => !this.deleteIds.includes(entry['id']))
  }

  public addOneToIndex(idx: number): number {
    return idx + 1;
  }

  private async updateUrlWithPage(): Promise<void> {
    await this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {page: this.currentPage},
      queryParamsHandling: 'merge',
    })
  }

  protected startComponent(): void {
    this.route.queryParams.subscribe((params: Params): void => {
      const page = params['page'];
      if (page !== undefined && isNaN(page)) {
        this.currentPage = +page;
      }
      this.getEntries();
    });
  }

  protected resetDeleteIds(): void {
    this.deleteIds = [];
  }

  protected initRouteState(navigation?: Navigation | null): void {
    if (isTruthy(navigation)) {
      const state: AnyProp | any = navigation?.extras?.state;
      if (isTruthy(state) && state != null && state['error']) {
        this.errorMessage = state?.['error'];
      }
    }
  }
}
