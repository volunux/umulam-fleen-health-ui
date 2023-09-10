import {Component, OnInit} from '@angular/core';
import {BaseFormImplComponent} from "../../../base/component/base-form/base-form-impl.component";
import {ProfessionalService} from "../../service/professional.service";
import {VerificationDocumentView} from "../../view/verification-document.view";
import {ErrorResponse} from "../../../base/response/error-response";
import {DEFAULT_DOCUMENT_CONSTRAINT} from "../../../shared/constant/enum-constant";
import {FormControl} from "@angular/forms";
import {FileConstraints} from "../../../shared/type/other";
import {SignedUrlService} from "../../../shared/service/signed-url.service";
import {Observable} from "rxjs";
import {SignedUrlResponse} from "../../../shared/response/signed-url.response";
import {DeleteResponse} from "../../../shared/response/delete.response";
import {S3Service} from "../../../shared/service/s3.service";

@Component({
  selector: 'app-professional-update-documents',
  templateUrl: './professional-update-documents.component.html',
  styleUrls: ['./professional-update-documents.component.css']
})
export class ProfessionalUpdateDocumentsComponent extends BaseFormImplComponent implements OnInit {
  protected readonly documentConstraints: FileConstraints = DEFAULT_DOCUMENT_CONSTRAINT;

  public constructor(protected professionalService: ProfessionalService,
                     protected signedUrlService: SignedUrlService,
                     protected s3Service: S3Service) {
    super();
  }

  public ngOnInit(): void {
    this.professionalService.getUploadDocuments()
      .subscribe({
        next: (result: VerificationDocumentView[]): void => {
          console.log(result);
        },
        error: (error: ErrorResponse): void => {
          console.log(error);
        }
    });
  }

  public updateDetails(detail: any): void {
    console.log(detail);
  }

  get educationCertificate(): FormControl {
    return new FormControl('');
  }

  get transcript(): FormControl {
    return new FormControl('');
  };

  get professionalMembership(): FormControl {
    return new FormControl('');
  }

  get curriculumVitae(): FormControl {
    return new FormControl('');
  }

  get signedUrlMethod(): (...data: any[]) => Observable<SignedUrlResponse> {
    return this.signedUrlService.generateForProfileVerificationDocument.bind(this.signedUrlService);
  }

  get saveFileMethod(): (...data: any[]) => Observable<any> {
    return this.noOpFunction$.bind(this);
  }

  get deleteFileMethod(): (...data: any[]) => Observable<DeleteResponse> {
    return this.professionalService.deleteDocument.bind(this.professionalService);
  }

  public downloadOrViewFileMethod(fileNameOrSignedUrlOrKey: string): Observable<SignedUrlResponse> {
    return this.professionalService.viewDocument(this.s3Service.getObjectKeyFromSignedUrl(fileNameOrSignedUrlOrKey) as string);
  }

}
