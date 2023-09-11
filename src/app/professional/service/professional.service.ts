import {Injectable} from '@angular/core';
import {HttpClientService} from "../../shared/service/http-client.service";
import {map, Observable} from "rxjs";
import {BaseRequest} from "../../shared/type/http";
import {ProfessionalView} from "../view/professional.view";
import {
  GetProfessionalUpdateVerificationDetailResponse
} from "../response/get-professional-update-verification-detail.response";
import {
  UpdateProfessionalAvailabilityStatusDto,
  UpdateProfessionalDetailsDto,
  UploadProfessionalDocumentDto
} from "../dto/professional.dto";
import {manyToType} from "../../shared/util/helpers";
import {VerificationDocumentView} from "../view/verification-document.view";
import {DeleteResponse} from "../../shared/response/delete.response";
import {SignedUrlResponse} from "../../shared/response/signed-url.response";
import {S3Service} from "../../shared/service/s3.service";
import {FleenHealthResponse} from "../../shared/response/fleen-health.response";
import {UserVerificationStatusView} from "../view/user-verification-status.view";
import {
  GetProfessionalUpdateAvailabilityStatusResponse
} from "../view/get-professional-update-availability-status.response";

@Injectable()
export class ProfessionalService {

  private readonly BASE_PATH: string = "professional";

  public constructor(private httpService: HttpClientService,
                     private s3Service: S3Service) { }

  public getDetails(): Observable<ProfessionalView> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'get-details']);
    return this.httpService.get(req)
      .pipe(
        map(data => new ProfessionalView(data))
      );
  }

  public getUpdateVerificationDetails(): Observable<GetProfessionalUpdateVerificationDetailResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'verification', 'update-details']);
    return this.httpService.get(req)
      .pipe(
        map(data => new GetProfessionalUpdateVerificationDetailResponse(data))
      );
  }

  public updateVerificationDetails(body: UpdateProfessionalDetailsDto): Observable<ProfessionalView> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'verification', 'update-details'], null, { ...body });
    return this.httpService.update(req)
      .pipe(
        map(data => new ProfessionalView(data))
      );
  }

  public getUploadDocuments(): Observable<VerificationDocumentView[]> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'verification', 'upload-documents']);
    return this.httpService.get(req)
      .pipe(
        map(data => manyToType(VerificationDocumentView, data))
      );
  }

  public deleteDocument(fileNameOrSignedUrlOrKey: string): Observable<DeleteResponse> {
    const key: string = this.s3Service.getObjectKeyFromSignedUrl(fileNameOrSignedUrlOrKey) as string
    const req: BaseRequest = this.httpService.toRequest(['delete', 'member-document'], { key });
    return this.httpService.delete(req)
      .pipe(
        map(data => new DeleteResponse(data))
      );
  }

  public viewDocument(fileNameOrSignedUrlOrKey: string): Observable<SignedUrlResponse> {
    const key: string = this.s3Service.getObjectKeyFromSignedUrl(fileNameOrSignedUrlOrKey) as string
    const req: BaseRequest = this.httpService.toRequest(['view', 'member-document'], { key });
    return this.httpService.get(req)
      .pipe(
        map(data => new SignedUrlResponse(data))
      );
  }

  public uploadDocuments(body: UploadProfessionalDocumentDto): Observable<FleenHealthResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'verification', 'upload-document'], null, { ...body });
    return this.httpService.update(req)
      .pipe(
        map(data => new FleenHealthResponse(data))
      );
  }

  public checkVerificationStatus(): Observable<UserVerificationStatusView> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'check-verification-status']);
    return this.httpService.get(req)
      .pipe(
        map(data => new UserVerificationStatusView(data))
      );
  }

  public requestVerification(): Observable<FleenHealthResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'request-verification']);
    return this.httpService.update(req)
      .pipe(
        map(data => new FleenHealthResponse(data))
      );
  }

  public getAvailabilityStatus(): Observable<GetProfessionalUpdateAvailabilityStatusResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'check-availability-status']);
    return this.httpService.get(req)
      .pipe(
        map(data => new GetProfessionalUpdateAvailabilityStatusResponse(data))
      );
  }

  public updateAvailabilityStatus(body: UpdateProfessionalAvailabilityStatusDto): Observable<FleenHealthResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'update-availability-status'], null, { ...body });
    return this.httpService.update(req)
      .pipe(
        map(data => new FleenHealthResponse(data))
      );
  }

}
