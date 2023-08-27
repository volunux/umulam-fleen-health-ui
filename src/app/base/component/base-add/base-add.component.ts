import {FormBuilder} from '@angular/forms';
import {Router} from "@angular/router";
import {BaseFormComponent} from "../base-form/base-form.component";
import {isFalsy, isTruthy} from "../../../shared/util/helpers";
import {Observable} from "rxjs";
import {ErrorResponse} from "../../response/error-response";

export abstract class BaseAddComponent<D, R> extends BaseFormComponent {

  protected constructor(protected router: Router,
                        protected formBuilder: FormBuilder) {
    super();
  }

  protected abstract initForm(): void;

  protected abstract $saveEntry(dto: D): Observable<R>;

  protected async goToEntries(errorMessage?: string): Promise<void> {
    const currentUrlSegments: string[] = this.router.url.split('/');
    currentUrlSegments.pop();

    const newRoute: string = [...currentUrlSegments, 'entries'].join('/');
    await this.router.navigate([newRoute], { state: { error: errorMessage ? errorMessage : '' } })
      .then((m: boolean) => m);
  }

  protected saveEntry(): void {
    if (isTruthy(this.fleenHealthForm) && this.fleenHealthForm.valid && isFalsy(this.isSubmitting)) {
      this.disableSubmitting();
      this.$saveEntry(this.fleenHealthForm.value)
        .subscribe({
          error: (result: ErrorResponse): void => {
            this.handleError(result);
          },
          complete: async (): Promise<void> => {
            this.enableSubmitting();
            await this.goToEntries();
          }
      });
    }
  }

}
