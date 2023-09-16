import {Observable} from "rxjs";
import {DeleteResponse} from "../../../shared/response/delete.response";
import {ErrorResponse} from "../../response/error-response";
import {BaseFormComponent} from "../base-form/base-form.component";
import {isFalsy, isTruthy} from "../../../shared/util/helpers";
import {CountAllResponse} from "../../../shared/response/count-all.response";

export abstract class BaseEntriesDeleteAllComponent extends BaseFormComponent {
  public isEntriesAvailable: boolean = false;

  protected abstract serviceCountAll(): Observable<CountAllResponse>;

  protected abstract serviceDeleteAll(): Observable<DeleteResponse>;

  public countAll(): void {
    this.serviceCountAll().subscribe({
      next: (result: CountAllResponse): void => {
        if (isTruthy(result.total)) {
          this.isEntriesAvailable = true;
        }
      },
      error: (error: ErrorResponse): void => {
        this.handleError(error);
      }
    });
  }

  public async deleteAll(): Promise<void> {
    if (isFalsy(this.isSubmitting)) {
      this.disableSubmittingAndResetErrorMessage();

      this.serviceDeleteAll().subscribe({
        error: (error: ErrorResponse): void => {
          this.handleError(error);
        },
        complete: (): void => {
          this.goToEntries(null, 1);
        }
      });
    }
  }
}
