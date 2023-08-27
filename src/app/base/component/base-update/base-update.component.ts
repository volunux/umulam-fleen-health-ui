import {BaseFormComponent} from "../base-form/base-form.component";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ErrorResponse} from "../../response/error-response";
import {Observable} from "rxjs";

export abstract class BaseUpdateComponent<T> extends BaseFormComponent {

  public entryView!: T;

  protected constructor(protected router: Router,
                        protected route: ActivatedRoute) {
    super();
  }

  protected abstract getServiceEntry(id: number | string): Observable<T>;

  protected abstract initForm(): void;

  public initEntry(): void {
    this.route.paramMap.subscribe(async (params: ParamMap): Promise<void> => {
      const id: number | string | null | any = params?.get('id');
      if (isNaN(id)) {
        await this.goToEntries();
        return;
      }
      this.getEntry(id);
    });
  }

  protected getEntry(id: number | string): void {
    this.getServiceEntry(id)
      .subscribe({
        next: (result: T): void => {
          this.entryView = result;
          this.initForm();
        },
        error: async (error: ErrorResponse): Promise<void> => {
          await this.goToEntries(error.message)
          return;
        }
      });
  }

  protected async goToEntries(errorMessage?: string): Promise<void> {
    const currentUrlSegments: string[] = this.router.url.split('/');
    currentUrlSegments.pop();
    currentUrlSegments.pop();

    const newRoute: string = [...currentUrlSegments, 'entries'].join('/');
    await this.router.navigate([newRoute], { state: { error: errorMessage ? errorMessage : '' } })
      .then((m: boolean) => m);
  }
}
