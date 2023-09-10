import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl} from "@angular/forms";
import {FileConstraints} from "../../type/other";
import {DEFAULT_IMAGE_CONSTRAINT} from "../../constant/enum-constant";
import {FileUploadDownloadService} from "../../service/file-upload-download.service";
import {isFalsy, isTruthy, nonNull} from "../../util/helpers";
import {catchError, Observable, Subscription, switchMap, tap, throwError} from "rxjs";
import {SignedUrlResponse} from "../../response/signed-url.response";
import {ExchangeRequest} from "../../type/http";
import {HttpEvent, HttpEventType, HttpResponse} from "@angular/common/http";
import {statusText} from "../../util/file-upload-download-messages";
import {ANY_EMPTY, DEFAULT_ERROR_MESSAGE, MISSING_CONFIG} from "../../constant/other-constant";
import {BaseFormComponent} from "../../../base/component/base-form/base-form.component";
import {Router} from "@angular/router";
import {ErrorResponse} from "../../../base/response/error-response";

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent extends BaseFormComponent implements OnInit {

  protected formBuilder!: FormBuilder;
  @Input('control') public control!: FormControl;
  @Input('control-label') public controlLabel: string = 'This field';
  @Input('file-constraints') public fileConstraints: FileConstraints = DEFAULT_IMAGE_CONSTRAINT;
  @Input('file-key') public fileKey!: string;
  @Input('file-id') public fileId!: string;
  @Input('can-download-or-view') public canDownloadOrView: boolean = false;
  @Input('signed-url-method') public generateSignedUrl$!: (...data: any[]) => Observable<any>;
  @Input('delete-file-method') public deleteFile$!: (...data: any[]) => Observable<any>;
  @Input('download-file-method') public downloadFile$!: (...data: any[]) => Observable<SignedUrlResponse>;
  @Input('save-file-method') public saveFile$!: (...data: any[]) => Observable<any>;
  @Output('upload-details') public uploadDetails: EventEmitter<any> = new EventEmitter<any>();
  @Output('delete-details') public deleteDetails: EventEmitter<any> = new EventEmitter<any>();
  @Input('file-url') public fileNameOrUrl: string | null = '';
  @ViewChild('elem', { static: false }) inputElement!: ElementRef;
  public uploadMessage: string = '';
  private cancelRequest$!: Subscription;
  private uploadCompleted: boolean = false;


  public constructor(protected fileService: FileUploadDownloadService) {
    super();
  }

  protected override getRouter(): Router {
    return ANY_EMPTY;
  }

  public ngOnInit(): void {
    if (this.checkConfig()) {
      this.formReady();
    }
  }

  public upload(input: HTMLInputElement, control: AbstractControl, constraints: FileConstraints): void {
    let files: FileList | null = input?.files;
    if (nonNull(files) && this.fileService.isFilesPresent(files) && nonNull(control) && nonNull(constraints)) {
      const file: File | any = this.fileService.getFirst(files);
      if (this.fileService.validationPassed(file, control, constraints)) {
        this.generateSignedUrlAndUploadFile(file.name, files as any, input);
      }
    }
  }

  private generateSignedUrlAndUploadFile(fileName: string, files: FileList, input: HTMLInputElement): void {
    const req: ExchangeRequest = this.fileService.toFileUploadRequest(files, this.fileNameOrUrl as string);
    this.cancelRequest$ = this.generateSignedUrl$(fileName)
      .pipe(
        switchMap((result: SignedUrlResponse): Observable<any> => {
          this.fileNameOrUrl = result.signedUrl;
          req.uri = this.fileNameOrUrl;
          return this.fileService.uploadFile(req);
        }),
        tap((event: any): void => {
          this.updateDownloadOrUploadProgress(event);
        }),
        catchError((error: any): Observable<any> => throwError(error))
      ).subscribe({
        error: (error): void => {
          error.message = error.message || DEFAULT_ERROR_MESSAGE;
          this.handleError(error);
          this.fileService.clearInputFiles(input);
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
    if (isTruthy(this.cancelRequest$)) {
      this.cancelRequest$.unsubscribe();
    }
    this.fileService.clearInputFiles(element);
    this.uploadMessage = statusText.fileUpload.abort;
  }

  private saveFile(fileNameOrUrl: string | null): void {
    if (nonNull(fileNameOrUrl) && isTruthy(this.saveFile$)) {
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

  public deleteFile(elem: HTMLInputElement): void {
    if (isTruthy(this.fileNameOrUrl) && isTruthy(this.deleteFile$)) {
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
            this.fileService.clearInputFiles(elem);
          }
      });
    }
  }

  public downloadOrView(pathOrUrlOrLinkOrKey: string, fileName: string): void {
    if (isTruthy(pathOrUrlOrLinkOrKey) && isTruthy(fileName) && isTruthy(this.downloadFile$) && isTruthy(this.canDownloadOrView)) {
      this.downloadFile$(pathOrUrlOrLinkOrKey)
        .pipe(
          switchMap((result: SignedUrlResponse) => {
            return this.fileService.downloadFile(result.signedUrl, fileName);
          })
        ).subscribe({
          error: (error: ErrorResponse | any): void => {
            this.handleError(error);
          }
       });
    }
  }

  private checkConfig(): boolean {
    if (isFalsy(this.generateSignedUrl$) && isFalsy(this.deleteFile$)) {
      throw new Error(MISSING_CONFIG);
    } else if (isFalsy(this.generateSignedUrl$) && isFalsy(this.deleteFile$)
        && isFalsy(this.downloadFile$) && isTruthy(this.canDownloadOrView)) {
      throw new Error(MISSING_CONFIG);
    } else if (isFalsy(this.downloadFile$) && isTruthy(this.canDownloadOrView)) {
      throw new Error(MISSING_CONFIG);
    }
    return true;
  }

  private updateDownloadOrUploadProgress(event: HttpEvent<any>): void {
    if (event.type === HttpEventType.UploadProgress) {
      const percentage: number = Math.round((event.loaded / event.total!) * 100);
      this.uploadMessage = statusText.fileUpload.inProgress(percentage);
    } else if (event instanceof HttpResponse) {
      this.uploadMessage = statusText.fileUpload.success;
    }
  }

  public readyForDownload(): boolean {
    if (this.fileNameOrUrl) {
      this.uploadCompleted = true;
    }
    return this.canDownloadOrView && this.uploadCompleted;
  }

}
