import {Component, OnInit} from '@angular/core';
import {BaseFormComponent} from "../../../base/component/base-form/base-form.component";
import {MemberService} from "../../service/member.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {GetMemberUpdateDetailsResponse} from "../../response/get-member-update-details.response";
import {ErrorResponse} from "../../../base/response/error-response";
import {isFalsy, isTruthy} from "../../../shared/util/helpers";
import {UpdateMemberDetailsResponse} from "../../response/update-member-details.response";

@Component({
  selector: 'app-member-update',
  templateUrl: './member-update.component.html',
  styleUrls: ['./member-update.component.css']
})
export class MemberUpdateComponent extends BaseFormComponent implements OnInit {

  protected entryView!: GetMemberUpdateDetailsResponse;

  public constructor(protected memberService: MemberService,
                     protected formBuilder: FormBuilder,
                     protected router: Router) {
    super();
  }

  public ngOnInit(): void {
    this.memberService.getUpdateDetails()
      .subscribe({
        next: (result: GetMemberUpdateDetailsResponse): void => {
          this.entryView = result;
        },
        error: (error: ErrorResponse): void => {
          this.handleError(error);
        }
    });
  }

  public submit(): void {
    if (isTruthy(this.memberUpdateForm) && this.memberUpdateForm.valid && isFalsy(this.isSubmitting)) {
      this.memberService.updateDetails(this.memberUpdateForm.value)
        .subscribe({
          next: (result: UpdateMemberDetailsResponse): void => {

          },
          error: (error: ErrorResponse): void => {
            this.handleError(error);
          },
          complete: (): void => {
            this.goToDashboard();
          }
      });
    }
  }

  protected override getRouter(): Router {
    return this.router;
  }

  get memberUpdateForm(): FormGroup {
    return this.fleenHealthForm;
  }

  private goToDashboard(): void {
    this.router.navigate(['..', 'dashboard'])
      .then(m => m);
  }

}
