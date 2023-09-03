import {Component, OnInit} from '@angular/core';
import {BaseFormComponent} from "../../../base/component/base-form/base-form.component";
import {ANY_EMPTY} from "../../../shared/constant/other-constant";
import {Router} from "@angular/router";
import {FormBuilder, FormControl} from "@angular/forms";
import {MemberService} from "../../service/member.service";
import {DEFAULT_IMAGE_CONSTRAINT} from "../../../shared/constant/enum-constant";
import {FileConstraints} from "../../../shared/type/other";
import {nonNull} from "../../../shared/util/helpers";
import {SignedUrlService} from "../../../shared/service/signed-url.service";
import {Observable, of} from "rxjs";
import {SignedUrlResponse} from "../../../shared/response/signed-url.response";
import {ErrorResponse} from "../../../base/response/error-response";
import {GetMemberUpdateDetailsResponse} from "../../response/get-member-update-details.response";
import {S3Service} from "../../../shared/service/s3.service";
import {DeleteResponse} from "../../../shared/response/delete.response";

@Component({
  selector: 'app-member-update-profile-photo',
  templateUrl: './member-update-profile-photo.component.html',
  styleUrls: ['./member-update-profile-photo.component.css']
})
export class MemberUpdateProfilePhotoComponent extends BaseFormComponent implements OnInit {

  protected override formBuilder!: FormBuilder;
  public signedUrl: string | null = null;
  public profilePhoto: FormControl = new FormControl<string>('');
  public photoConstraints: FileConstraints = DEFAULT_IMAGE_CONSTRAINT;

  public constructor(protected memberService: MemberService,
                     protected signedUrlService: SignedUrlService,
                     protected s3Service: S3Service) {
    super();
  }

  protected override getRouter(): Router {
    return ANY_EMPTY;
  }

  public ngOnInit(): void {
    this.memberService.getDetails()
      .subscribe({
        next: (result: GetMemberUpdateDetailsResponse): void => {
          this.signedUrl = result.profilePhoto;
        },
        error: (error: ErrorResponse): void => {
          this.handleError(error);
        }
    });
  }

  private savePhoto(signedUrl: string): Observable<any> {
    if (nonNull(signedUrl)) {
      return this.memberService.updateProfilePhoto({
        profilePhoto: this.s3Service.extractBaseUrl(signedUrl)!
      });
    }
    return of(ANY_EMPTY);
  }

  get signedUrlMethod(): (...data: any[]) => Observable<SignedUrlResponse> {
    return this.signedUrlService.generateForProfilePhoto.bind(this.signedUrlService);
  }

  get saveFileMethod(): (...data: any[]) => Observable<any> {
    return this.savePhoto.bind(this);
  }

  get deleteFileMethod(): (...data: any[]) => Observable<DeleteResponse> {
    return this.memberService.removeProfilePhoto.bind(this.memberService);
  }

}
