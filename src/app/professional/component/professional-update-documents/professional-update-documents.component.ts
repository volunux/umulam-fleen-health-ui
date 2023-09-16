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
import {UploadProfessionalDocumentDto} from "../../dto/professional.dto";
import {ANY_EMPTY, FORM_INCOMPLETE, FORM_SUCCESS} from "../../../shared/constant/other-constant";
import {FileDetail} from "../../../shared/interface/base";
import {
  areAllPropertiesTruthy,
  getFirstKeyAndValue,
  isFalsy,
  isTruthy,
  removeEmptyKeys,
  toCamelCase
} from "../../../shared/util/helpers";

@Component({
  selector: 'app-professional-update-documents',
  templateUrl: './professional-update-documents.component.html',
  styleUrls: ['./professional-update-documents.component.css']
})
export class ProfessionalUpdateDocumentsComponent extends BaseFormImplComponent implements OnInit {
  protected readonly documentConstraints: FileConstraints = DEFAULT_DOCUMENT_CONSTRAINT;
  public dto: UploadProfessionalDocumentDto = new UploadProfessionalDocumentDto(ANY_EMPTY);
  public educationCertificate!: FormControl;
  public transcript!: FormControl;
  public professionalMembership!: FormControl;
  public curriculumVitae!: FormControl;

  public constructor(protected professionalService: ProfessionalService,
                     protected signedUrlService: SignedUrlService) {
    super();
  }

  public ngOnInit(): void {
    this.professionalService.getUploadDocuments()
      .subscribe({
        next: (result: VerificationDocumentView[]): void => {
          this.initDocumentDetails(result);
          this.initForm();
        },
        error: (error: ErrorResponse): void => {
          this.handleError(error);
        }
    });
  }

  private initForm(): void {
    this.educationCertificate = new FormControl('');
    this.transcript = new FormControl('');
    this.professionalMembership = new FormControl('');
    this.curriculumVitae = new FormControl('');
    this.formReady();
  }

  private initDocumentDetails(documents: VerificationDocumentView[]): void {
    if (isTruthy(documents) && Array.isArray(documents)) {
      documents.forEach((document: VerificationDocumentView): void => {
        this.dto[toCamelCase(document.documentType)] = document.link;
      });
    }
  }

  public updateDetails(detail: FileDetail): void {
    const [key, value] = getFirstKeyAndValue(detail);
    this.dto[key] = value;
  }

  public uploadDocuments(): void {
    if (isFalsy(this.isSubmitting) && areAllPropertiesTruthy(this.dto)) {
      this.disableSubmitting();
      this.resetErrorMessage();
      removeEmptyKeys(this.dto);

      this.professionalService.uploadDocuments(this.dto)
        .subscribe({
          error: (error: ErrorResponse): void => {
            this.handleError(error);
          },
          complete: (): void => {
            this.statusMessage = FORM_SUCCESS;
            this.enableSubmitting();
          }
      });
    } else {
      this.errorMessage = FORM_INCOMPLETE;
    }
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

  get downloadOrViewFileMethod(): (...data: any[]) => Observable<SignedUrlResponse> {
    return this.professionalService.viewDocument.bind(this.professionalService);
  }

}
