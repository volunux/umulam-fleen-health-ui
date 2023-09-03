import {Component, OnInit} from '@angular/core';
import {BaseFormComponent} from "../../../base/component/base-form/base-form.component";
import {ANY_EMPTY, DEFAULT_ERROR_MESSAGE} from "../../../shared/constant/other-constant";
import {Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormControl} from "@angular/forms";
import {MemberService} from "../../service/member.service";
import {DEFAULT_IMAGE_CONSTRAINT} from "../../../shared/constant/enum-constant";
import {FileConstraints} from "../../../shared/type/other";
import {FileUploadDownloadService} from "../../../shared/service/file-upload-download.service";
import {nonNull} from "../../../shared/util/helpers";
import {SignedUrlService} from "../../../shared/service/signed-url.service";
import {catchError, Observable, Subscription, switchMap, tap, throwError} from "rxjs";
import {ExchangeRequest} from "../../../shared/type/http";
import {SignedUrlResponse} from "../../../shared/response/signed-url.response";
import {HttpEventType} from "@angular/common/http";
import {statusText} from "../../../shared/util/file-upload-download-messages";
import {ErrorResponse} from "../../../base/response/error-response";
import {GetMemberUpdateDetailsResponse} from "../../response/get-member-update-details.response";
import {S3Service} from "../../../shared/service/s3.service";

@Component({
  selector: 'app-member-update-profile-photo',
  templateUrl: './member-update-profile-photo.component.html',
  styleUrls: ['./member-update-profile-photo.component.css']
})
export class MemberUpdateProfilePhotoComponent extends BaseFormComponent implements OnInit {

  protected override formBuilder!: FormBuilder;
  public uploadMessage: string = '';

  public profilePhoto: FormControl = new FormControl<string>('');
  public photoConstraints: FileConstraints = DEFAULT_IMAGE_CONSTRAINT;
  public signedUrl: string | null = null;

  public constructor(protected memberService: MemberService,
                     protected fileService: FileUploadDownloadService,
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

  private savePhoto(signedUrl: string): void {
    if (nonNull(signedUrl)) {
      this.memberService.updateProfilePhoto({
        profilePhoto: this.s3Service.extractBaseUrl(signedUrl)!
      }).subscribe({
        complete: (): void => {
          this.uploadMessage = statusText.fileUpload.success;
        },
        error: (error: ErrorResponse): void => {
          this.handleError(error);
        },
      });
    }
  }

  get signedUrlMethod(): Function {
    return this.signedUrlService.generateForProfilePhoto;
  }

  get saveFileMethod(): Function {
    return this.savePhoto;
  }

  get deleteFileMethod(): Function {
    return this.memberService.removeProfilePhoto;
  }

}
