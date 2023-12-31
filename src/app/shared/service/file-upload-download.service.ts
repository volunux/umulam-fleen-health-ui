import {Injectable} from '@angular/core';
import {isFalsy, isObject, isTruthy, nonNull} from "../util/helpers";
import {CONTENT_TYPE_HEADER_KEY, DEFAULT_ERROR_MESSAGE, DEFAULT_UPLOAD_MAX_FILE_SIZE} from "../constant/other-constant";
import {HttpClientService} from "./http-client.service";
import {Observable, Subscriber} from "rxjs";
import {ExchangeRequest, RequestMethod} from "../type/http";
import {HttpHeaders} from "@angular/common/http";
import {AbstractControl} from "@angular/forms";
import {FileConstraints} from "../type/other";
import {LoggerService} from "../../base/service/logger.service";

@Injectable()
export class FileUploadDownloadService {

  constructor(protected httpService: HttpClientService,
              protected logger: LoggerService) { }

  public isFileEmpty(file): boolean {
    return isFalsy(file);
  }

  public getFirst(files: FileList | null): File | null {
    if (this.isFilesPresent(files)) {
      return (files as any)[0];
    }
    return null;
  }

  public isFilesPresent(files: FileList | null): boolean {
    return isTruthy(files) && isObject(files) && (files as any).length > 0;
  }

  public isFileSizeValid(file: File, maxSize: number = DEFAULT_UPLOAD_MAX_FILE_SIZE): boolean {
    let fileSize: number = Math.round((file.size / 1024 / 1024));
    return fileSize < maxSize;
  }

  public isFileTypeValid(allowedFileTypes: string[], type: string): boolean {
    return allowedFileTypes.includes(type);
  }

  public createAndBuildFormData(files: FileList): FormData {
    const formData: FormData = new FormData();
    if (this.isFilesPresent(files)) {
      return this.buildFormData(formData, files);
    }
    return formData;
  }

  public buildFormData(formData: FormData, files: FileList): FormData {
    Array
      .from(files)
      .forEach((file: File, index: number) => formData.append(index.toString(), file));
    return formData;
  }

  public clearInputFiles(element: HTMLInputElement): void {
    if (nonNull(element)) {
      (<any>element).value = null;
    }
  }

  public uploadFile(req: ExchangeRequest, contentType: string): Observable<any> {
    let { headers } = req;
    if (isFalsy(headers)) {
      headers = new HttpHeaders()
        .set(CONTENT_TYPE_HEADER_KEY, contentType)
      req.headers = headers;
    }
    return this.httpService.exchange(req);
  }


  public validationPassed(file: File | null | any, control: AbstractControl, validators: FileConstraints): boolean {
    if (nonNull(file)) {
      const { maxFileSize, allowableTypes } = validators;
      if (this.isFileEmpty(file)) {
        control.setErrors({ fileEmpty: true });
      }

      if (!(this.isFileSizeValid(file, maxFileSize))) {
        control.setErrors({ fileSize: true });
      }

      if (!(this.isFileTypeValid(allowableTypes, file.type))) {
        control.setErrors({ fileType: true });
      }

      if (nonNull(control.errors)) {
        return false;
      }
    }
    return true;
  }

  public toFileUploadRequest(files: FileList, uri: string, method: RequestMethod = 'PUT'): ExchangeRequest {
    const body: FormData = this.createAndBuildFormData(files);
    return {
      uri,
      method,
      body,
      reportProgress: true,  observe: 'events'
    }
  }

  public downloadFile(path: string, filename: string): Observable<void> {
    return new Observable<void>((observer: Subscriber<void>): void => {
      const anchor: HTMLAnchorElement = document.createElement('a');
      anchor.href = path;
      anchor.download = filename;
      anchor.target = '_blank';

      anchor.style.display = 'none';
      document.body.appendChild(anchor);

      anchor.addEventListener('click', (): void => {
        document.body.removeChild(anchor);
        observer.next();
        observer.complete();
      });

      anchor.click();
    });
  }

  public downloadFileBlob(fileUrl: string, fileName: string): void {
    fetch(fileUrl)
      .then((response: Response) => response.blob())
      .then((blob: Blob): void => {
        const blobUrl: string = window.URL.createObjectURL(blob);

        const a: HTMLAnchorElement = document.createElement('a');
        a.href = blobUrl;
        a.download = fileName;

        a.click();
        window.URL.revokeObjectURL(blobUrl);
      })
      .catch(error => {
        this.logger.error(DEFAULT_ERROR_MESSAGE, error);
      });
  }

}
