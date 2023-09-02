import {Component, OnInit} from '@angular/core';
import {BaseFormComponent} from "../../../base/component/base-form/base-form.component";
import {ANY_EMPTY} from "../../../shared/constant/other-constant";
import {Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormControl} from "@angular/forms";
import {MemberService} from "../../service/member.service";
import {DEFAULT_IMAGE_CONSTRAINT} from "../../../shared/constant/enum-constant";
import {FileConstraints} from "../../../shared/type/other";
import {FileUploadDownloadService} from "../../../shared/service/file-upload-download.service";
import {nonNull} from "../../../shared/util/helpers";
import {SignedUrlService} from "../../../shared/service/signed-url.service";
import {catchError, Observable, switchMap, throwError} from "rxjs";
import {ExchangeRequest} from "../../../shared/type/http";
import {SignedUrlResponse} from "../../../shared/response/signed-url.response";

@Component({
  selector: 'app-member-update-profile-photo',
  templateUrl: './member-update-profile-photo.component.html',
  styleUrls: ['./member-update-profile-photo.component.css']
})
export class MemberUpdateProfilePhotoComponent extends BaseFormComponent implements OnInit {

  protected override formBuilder!: FormBuilder;

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
    console.log(control);
  }

  private generateSignedUrlAndUploadFile(fileName: string, files: FileList): void {
    this.signedUrlService.generateForProfilePhoto(fileName)
      .pipe(
        switchMap((result: SignedUrlResponse): Observable<any> => {
          console.log(result);
          const req: ExchangeRequest = this.fileService.toFileUploadRequest(result.signedUrl);
          req.body = this.fileService.createAndBuildFormData(files);
          const { request: uploadRequest, abort } = this.fileService.uploadFile(req);
          console.log(uploadRequest);
          console.log(abort);
          return uploadRequest;
        }),
        catchError((error: any): Observable<any> => throwError(error))
      ).subscribe({
      next: (result): void => {
        console.log(result);
      },
      error: (error): void => {
        console.log(error);
      }
    })
  }
}
