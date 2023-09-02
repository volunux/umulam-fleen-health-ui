import {Injectable} from '@angular/core';
import {isFalsy, isObject, isTruthy, nonNull} from "../util/helpers";
import {DEFAULT_UPLOAD_MAX_FILE_SIZE, X_CANCEL_REQUEST_HEADER_KEY} from "../constant/other-constant";
import {HttpClientService} from "./http-client.service";
import {Observable, of, Subject} from "rxjs";
import {ExchangeRequest, FileUploadRequest} from "../type/http";
import {HttpHeaders} from "@angular/common/http";
import {AbstractControl} from "@angular/forms";
import {FileConstraints} from "../type/other";

@Injectable({
  providedIn: 'root'
})
export class FileUploadDownloadService {

  constructor(protected httpService: HttpClientService) { }

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

  public getAllowableExtensions(fileTypes: string[]): string[] {
    let fileExtensions: string[] = [];
    for (const filetype of fileTypes) {
      fileExtensions.push(filetype.split('/')[1]);
    }
    return fileExtensions;
  }

  public createAndBuildFormData(files: FileList): FormData {
    const formData: FormData = new FormData();
    return this.buildFormData(formData, files);
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

  public uploadFile(req: ExchangeRequest): Observable<FileUploadRequest> {
    const headers: HttpHeaders = new HttpHeaders();
    const cancelRequest: Subject<void> = this.addCancelRequestHeaders(headers);
    const request: Observable<any> = this.httpService.exchange(req);
    return of(
      {
        request: request,
        abort: cancelRequest
      }
    );
  }

  public addCancelRequestHeaders(headers: HttpHeaders): Subject<void> {
    const cancelRequest: any = this.cancelRequestSubject as any;
    headers.append(X_CANCEL_REQUEST_HEADER_KEY, cancelRequest);
    return cancelRequest;
  }

  get cancelRequestSubject(): Subject<void> {
    return new Subject<void>();
  }

  public validateFileControl(file: File | null | any, control: AbstractControl, validators: FileConstraints): boolean {
    console.log(file);
    console.log(validators);
    if (nonNull(file)) {
      const { maxFileSize, allowableTypes } = validators;
      if (this.isFileEmpty(file)) {
        control.setErrors({ fileEmpty: true });
        // return false;
      }

      console.log(this.isFileSizeValid(file, maxFileSize));

      if (!(this.isFileSizeValid(file, maxFileSize))) {
        control.setErrors({ fileSize: true });
        // return false;
      }

      if (!(this.isFileTypeValid(allowableTypes, file.type))) {
        control.setErrors({ fileType: true });
        // return false;
      }

      return true;
    }
    return false;
  }
}
