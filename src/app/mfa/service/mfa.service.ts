import {Injectable} from '@angular/core';
import {HttpClientService} from "../../shared/service/http-client.service";
import {map, Observable} from "rxjs";
import {BaseRequest} from "../../shared/type/http";
import {MfaStatusResponse} from "../response/mfa-status.response";
import {ConfirmMfaDto, MfaTypeDto} from "../dto/mfa.dto";
import {MfaDetailResponse} from "../response/mfa-detail.response";
import {FleenHealthResponse} from "../../shared/response/fleen-health.response";

@Injectable()
export class MfaService {

  private readonly BASE_PATH: string = "mfa";

  public constructor(private httpService: HttpClientService) { }

  public getStatus(): Observable<MfaStatusResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'status']);
    return this.httpService.get(req)
      .pipe(
        map(data => new MfaStatusResponse(data))
      )
  }

  public setup(body: MfaTypeDto): Observable<MfaDetailResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'setup'], null, { ...body });
    return this.httpService.update(req)
      .pipe(
        map(data => new MfaDetailResponse(data))
      );
  }

  public confirmSetup(body: ConfirmMfaDto): Observable<FleenHealthResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'confirm-mfa-setup'], null, { ...body });
    return this.httpService.update(req)
      .pipe(
        map(data => new FleenHealthResponse(data))
      );
  }

  public reEnable(dto: ConfirmMfaDto): Observable<FleenHealthResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 're-enable']);
    return this.httpService.update(req)
      .pipe(
        map(data => new FleenHealthResponse(data))
      );
  }

  public disable(): Observable<FleenHealthResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'disable']);
    return this.httpService.update(req)
      .pipe(
        map(data => new FleenHealthResponse(data))
      );
  }
}
