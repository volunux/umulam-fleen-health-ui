import {Component, OnInit} from '@angular/core';
import {MfaService} from "../../service/mfa.service";
import {MfaStatusResponse} from "../../response/mfa-status.response";
import {BaseFormComponent} from "../../../base/component/base-form/base-form.component";
import {ANY_EMPTY} from "../../../shared/constant/other-constant";
import {Router} from "@angular/router";
import {ErrorResponse} from "../../../base/response/error-response";
import {FormBuilder} from "@angular/forms";
import {Observable} from "rxjs";
import {FleenHealthResponse} from "../../../shared/response/fleen-health.response";

@Component({
  selector: 'app-mfa-status',
  templateUrl: './mfa-status.component.html',
  styleUrls: ['./mfa-status.component.css']
})
export class MfaStatusComponent extends BaseFormComponent implements OnInit {

  protected formBuilder!: FormBuilder;
  public mfaStatus!: MfaStatusResponse;

  public constructor(protected mfaService: MfaService) {
    super();
  }

  protected override getRouter(): Router {
    return ANY_EMPTY;
  }

  public ngOnInit(): void {
    this.mfaService.getStatus()
      .subscribe({
        next: (result: MfaStatusResponse): void => {
          this.mfaStatus = result;
        },
        error: (error: ErrorResponse): void => {
          this.handleError(error);
        }
    });
  }

  public reEnableOrDisableMfa(status: boolean): void {
    this.getServiceMethod(status)
      .subscribe({
        next: (result: FleenHealthResponse): void => {
          this.statusMessage = result.message;
        },
        error: (error: ErrorResponse): void => {
          this.handleError(error);
        }
      })
  }

  private getServiceMethod(status: boolean): Observable<FleenHealthResponse> {
    return status ? this.mfaService.reEnable() : this.mfaService.disable();
  }

  private updateMfaStatus(status: boolean): void {
    this.mfaStatus.enabled = status;
  }

}
