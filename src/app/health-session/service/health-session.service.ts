import {Injectable} from '@angular/core';
import {HttpClientService} from "../../shared/service/http-client.service";
import {AnyProp} from "../../shared/type/base";
import {map, Observable} from "rxjs";
import {SearchResultView} from "../../shared/view/search-result.view";
import {BaseRequest} from "../../shared/type/http";
import {mapToSearchResult} from "../../shared/util/helpers";
import {ProfessionalView} from "../../professional/view/professional.view";
import {ProfessionalCheckAvailabilityResponse} from "../response/professional-check-availability.response";
import {GetProfessionalBookSessionResponse} from "../response/get-professional-book-session.response";
import {AddHealthSessionReviewDto, BookHealthSessionDto, ReScheduleHealthSessionDto} from "../dto/health-session.dto";
import {PendingHealthSessionBookingResponse} from "../response/pending-health-session-booking.response";
import {HealthSessionView} from "../view/health-session.view";
import {FleenHealthResponse} from "../../shared/response/fleen-health.response";

@Injectable()
export class HealthSessionService {

  private readonly BASE_PATH: string = "health";

  public constructor(private httpService: HttpClientService) { }

  public viewProfessionals(params: AnyProp): Observable<SearchResultView<ProfessionalView>> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'professionals'], params);
    return this.httpService.get(req)
      .pipe(
        map(data => mapToSearchResult(ProfessionalView, data))
      );
  }

  public viewProfessionalDetail(id: number | string): Observable<ProfessionalView> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'professional', 'detail', +id]);
    return this.httpService.getOne(req)
      .pipe(
        map(data => new ProfessionalView(data))
      );
  }

  public viewProfessionalAvailability(id: number | string): Observable<ProfessionalCheckAvailabilityResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'professional', 'check-availability', +id]);
    return this.httpService.getOne(req)
      .pipe(
        map(data => new ProfessionalCheckAvailabilityResponse(data))
      );
  }

  public getProfessionalBookSession(id: number | string): Observable<GetProfessionalBookSessionResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'professional', 'book-session', +id]);
    return this.httpService.getOne(req)
      .pipe(
        map(data => new GetProfessionalBookSessionResponse(data))
      );
  }

  public bookSession(body: BookHealthSessionDto): Observable<PendingHealthSessionBookingResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'professional', 'book-session'], null, { ...body });
    return this.httpService.post(req)
      .pipe(
        map(data => new PendingHealthSessionBookingResponse(data))
      );
  }

  public viewSessions(params: AnyProp): Observable<SearchResultView<HealthSessionView>> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'session', 'entries'], params);
    return this.httpService.get(req)
      .pipe(
        map(data => mapToSearchResult(HealthSessionView, data))
      );
  }

  public viewSessionDetail(id: number | string): Observable<HealthSessionView> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'session', 'detail', +id]);
    return this.httpService.getOne(req)
      .pipe(
        map(data => new HealthSessionView(data))
      );
  }

  public rescheduleSession(healthSessionId: number | string, body: ReScheduleHealthSessionDto): Observable<FleenHealthResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'session', 'reschedule-session', +healthSessionId], null, { ...body });
    return this.httpService.update(req)
      .pipe(
        map(data => new FleenHealthResponse(data))
      );
  }

  public cancelSession(healthSessionId: number | string): Observable<FleenHealthResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'session', 'cancel-session', +healthSessionId]);
    return this.httpService.update(req)
      .pipe(
        map(data => new FleenHealthResponse(data))
      );
  }

  public addSessionReview(healthSessionId: number | string, body: AddHealthSessionReviewDto): Observable<FleenHealthResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'session', 'add-review', +healthSessionId], null , { ...body });
    return this.httpService.update(req)
      .pipe(
        map(data => new FleenHealthResponse(data))
      );
  }

}
