import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl} from "@angular/forms";
import {FileConstraints} from "../../type/other";
import {DEFAULT_IMAGE_CONSTRAINT} from "../../constant/enum-constant";
import {FileUploadDownloadService} from "../../service/file-upload-download.service";
import {isTruthy, nonNull} from "../../util/helpers";
import {catchError, Observable, Subscription, switchMap, tap, throwError} from "rxjs";
import {SignedUrlResponse} from "../../response/signed-url.response";
import {ExchangeRequest} from "../../type/http";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {statusText} from "../../util/file-upload-download-messages";
import {ANY_EMPTY, DEFAULT_ERROR_MESSAGE} from "../../constant/other-constant";
import {BaseFormComponent} from "../../../base/component/base-form/base-form.component";
import {Router} from "@angular/router";
import {ErrorResponse} from "../../../base/response/error-response";

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent extends BaseFormComponent {

  protected formBuilder!: FormBuilder;
  @Input('control') public control!: FormControl;
  @Input('control-label') public controlLabel: string = 'This field';
  @Input('file-constraints') public fileConstraints: FileConstraints = DEFAULT_IMAGE_CONSTRAINT;
  @Input('file-key') public fileKey!: string;
  @Input('file-id') public fileId!: string;
  @Input('signed-url-method') public generateSignedUrl$!: (...data: any[]) => Observable<any>;
  @Input('delete-file-method') public deleteFile$!: (...data: any[]) => Observable<any>;
  @Input('save-file-method') public saveFile$!: (...data: any[]) => Observable<any>;
  @Output('upload-details') public uploadDetails: EventEmitter<any> = new EventEmitter<any>();
  @Output('delete-details') public deleteDetails: EventEmitter<any> = new EventEmitter<any>();
  @Input('file-url') public fileNameOrUrl: string | null = '';
  @ViewChild('elem', { static: false }) inputElement!: ElementRef;
  public uploadMessage: string = '';
  private cancelRequest$!: Subscription;


  public constructor(protected fileService: FileUploadDownloadService) {
    super();
  }

  protected override getRouter(): Router {
    return ANY_EMPTY;
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

  private generateSignedUrlAndUploadFile(fileName: string, files: FileList): void {
    this.cancelRequest$ = this.generateSignedUrl$(fileName)
      .pipe(
        switchMap((result: SignedUrlResponse): Observable<any> => {
          this.fileNameOrUrl = result.signedUrl;
          const req: ExchangeRequest = this.fileService.toFileUploadRequest(files, result.signedUrl);
          return this.fileService.uploadFile(req);
        }),
        tap((event: any): void => {
          if (event.type === HttpEventType.UploadProgress) {
            const percentage: number = Math.round((event.loaded / event.total!) * 100);
            this.uploadMessage = statusText.fileUpload.inProgress(percentage);
          } else if (event instanceof HttpResponse) {
            this.uploadMessage = statusText.fileUpload.success;
          }
        }),
        catchError((error: any): Observable<any> => throwError(error))
      ).subscribe({
        error: (error): void => {
          error.message = error.message || DEFAULT_ERROR_MESSAGE;
          this.handleError(error);
        },
        complete: (): void => {
          this.saveFile(this.fileNameOrUrl);
          this.uploadDetails.emit({
            [(this.fileKey)]: this.fileNameOrUrl
          });
        }
    });
  }

  public cancelUpload(element: HTMLInputElement): void {
    this.cancelRequest$.unsubscribe();
    this.fileService.clearInputFiles(element);
    this.uploadMessage = statusText.fileUpload.abort;
  }

  private saveFile(fileNameOrUrl: string | null): void {
    if (nonNull(fileNameOrUrl)) {
      this.saveFile$(fileNameOrUrl).subscribe({
        complete: (): void => {
          this.uploadMessage = statusText.fileUpload.success;
        },
        error: (): void => {
          this.uploadMessage = statusText.fileUpload.error;
          this.fileService.clearInputFiles(this.inputElement?.nativeElement);
        },
      });
    }
  }

  public deleteFile(): void {
    if (isTruthy(this.fileNameOrUrl)) {
      this.uploadMessage = statusText.deleteObject.inProgress;
      this.deleteFile$(this.fileNameOrUrl)
        .subscribe({
          error: (error: ErrorResponse): void => {
            error.message = statusText.deleteObject.error;
            this.handleError(error);
          },
          complete: (): void => {
            this.fileNameOrUrl = null;
            this.uploadMessage = statusText.deleteObject.success;
            this.deleteDetails.emit({
              [(this.fileKey)]: this.fileNameOrUrl
            });
          }
      });
    }
  }

}
