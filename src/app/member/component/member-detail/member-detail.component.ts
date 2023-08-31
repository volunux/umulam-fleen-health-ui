import {Component, OnInit} from '@angular/core';
import {GetMemberUpdateDetailsResponse} from "../../response/get-member-update-details.response";
import {FormBuilder} from "@angular/forms";
import {Observable} from "rxjs";
import {MemberService} from "../../service/member.service";
import {Router} from "@angular/router";
import {ErrorResponse} from "../../../base/response/error-response";

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  protected entryView!: GetMemberUpdateDetailsResponse;

  public constructor(protected memberService: MemberService,
                     protected router: Router) { }

  public ngOnInit(): void {
    this.memberService.getDetails()
      .subscribe({
        next: (result: GetMemberUpdateDetailsResponse): void => {
          this.entryView = result;
        },
        error: (error: ErrorResponse): void => {

        }
      });
  }

}
