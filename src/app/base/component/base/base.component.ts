import {ErrorResponse} from "../../response/error-response";

export abstract class BaseComponent {

  protected errorMessage: string | undefined;

  protected handleError(error: ErrorResponse): void {
    this.errorMessage = error?.message || '';
  }
}
