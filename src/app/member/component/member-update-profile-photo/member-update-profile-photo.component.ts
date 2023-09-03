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
import {catchError, concatMap, Observable, of, Subscription, switchMap, tap, throwError} from "rxjs";
import {ExchangeRequest} from "../../../shared/type/http";
import {SignedUrlResponse} from "../../../shared/response/signed-url.response";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {statusText} from "../../../shared/util/file-upload-download-messages";
import {FleenHealthResponse} from "../../../shared/response/fleen-health.response";

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

  public constructor(protected memberService: MemberService,
                     protected fileService: FileUploadDownloadService,
                     protected signedUrlService: SignedUrlService) {
    super();
  }

  protected override getRouter(): Router {
    return ANY_EMPTY;
  }

  public ngOnInit(): void {

  }

  public upload(input: HTMLInputElement, control: AbstractControl, constraints: FileConstraints): void {
    let files: FileList | null = input?.files;
    if (nonNull(files) && this.fileService.isFilesPresent(files) && nonNull(control) && nonNull(constraints)) {
      const file: File | any = this.fileService.getFirst(files);
      if (this.fileService.validationPassed(file, control, constraints)) {
        this.generateSignedUrlAndUploadFile(file.name, files as any);
      }
    }
  }

  public cancelRequest$!: Subscription;

  public cancelUpload(element: HTMLInputElement): void {
    this.cancelRequest$.unsubscribe();
    this.fileService.clearInputFiles(element);
    this.uploadMessage = statusText['fileUpload']['abort'];
  }

  private generateSignedUrlAndUploadFile(fileName: string, files: FileList): void {
    let signedUrl: string | null = null;
    this.cancelRequest$ = this.signedUrlService.generateForProfilePhoto(fileName)
      .pipe(
        switchMap((result: SignedUrlResponse): Observable<any> => {
          signedUrl = result.signedUrl;
          const req: ExchangeRequest = this.fileService.toFileUploadRequest(files, result.signedUrl);
          return this.fileService.uploadFile(req);
        }),
        tap((event: any): void => {
          if (event.type === HttpEventType.UploadProgress) {
            const percentage: number = Math.round((event.loaded / event.total!) * 100);
            this.uploadMessage = statusText['fileUpload']['inProgress'](percentage);
          } else if (event instanceof HttpResponse) {
            this.uploadMessage = statusText['fileUpload']['success'];
          }
        }),
        catchError((error: any): Observable<any> => throwError(error)),
        concatMap((result: any): Observable<any> => {
          if (nonNull(signedUrl)) {
            return this.memberService.updateProfilePhoto({
              profilePhoto: this.fileService.extractS3BaseUrl(signedUrl)!
            });
          }
          return of(ANY_EMPTY);
        })
      ).subscribe({
      next: (result: FleenHealthResponse): void => {
        console.log(result);
      },
      error: (error): void => {
        error.message = error.message || DEFAULT_ERROR_MESSAGE;
        this.handleError(error);
      }
    });
  }
}
