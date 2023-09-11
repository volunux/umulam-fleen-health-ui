import {ErrorResponse} from "../../response/error-response";
import {ERR_CONNECTION_REFUSED_MESSAGE} from "../../../shared/constant/error-constant";
import {DEFAULT_ERROR_MESSAGE} from "../../../shared/constant/other-constant";

export abstract class BaseComponent {

  protected errorMessage: string = '';

  protected handleError(error: ErrorResponse): void {
    this.errorMessage = error?.message || '';
    if (this.errorMessage.includes(ERR_CONNECTION_REFUSED_MESSAGE)) {
      this.errorMessage = DEFAULT_ERROR_MESSAGE;
    }
  }
}
