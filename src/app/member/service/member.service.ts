import {Injectable} from '@angular/core';
import {HttpClientService} from "../../shared/service/http-client.service";
import {map, Observable} from "rxjs";
import {SearchResultView} from "../../shared/view/search-result.view";
import {CountryView} from "../../country/view/country.view";
import {BaseRequest} from "../../shared/type/http";
import {GetMemberUpdateDetailsResponse} from "../response/get-member-update-details.response";

@Injectable()
export class MemberService {

  private readonly BASE_PATH: string = "member";

  public constructor(private httpService: HttpClientService) { }

  public getDetails(): Observable<GetMemberUpdateDetailsResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'get-details']);
    return this.httpService.get(req)
      .pipe(
        map(data => new GetMemberUpdateDetailsResponse(data))
      )
  }
}
