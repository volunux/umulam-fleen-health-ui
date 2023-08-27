import {Injectable} from '@angular/core';
import {HttpClientService} from "../../shared/service/http-client.service";
import {map, Observable} from "rxjs";
import {BaseRequest} from "../../shared/type/http";
import {CountryView} from "../view/country.view";
import {mapToSearchResult} from "../../shared/util/helpers";
import {SearchResultView} from "../../shared/view/search-result.view";
import {AnyProp} from "../../shared/type/base";
import {DeleteIdsDto} from "../../shared/type/other";
import {DeleteResponse} from "../../shared/response/delete.response";
import {UpdateCountryDto} from "../dto/country.dto";

@Injectable()
export class CountryService {

  private readonly BASE_PATH: string = "country";

  constructor(private httpService: HttpClientService) { }

  public findCountries(params: AnyProp): Observable<SearchResultView<CountryView>> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'entries'], params);
    return this.httpService.get(req)
      .pipe(
        map(data => mapToSearchResult(CountryView, data))
      )
  }

  public findCountry(id: number | string): Observable<CountryView> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'detail', +id]);
    return this.httpService.get(req)
      .pipe(
        map(data => new CountryView(data))
      );
  }

  public updateCountry(id: number | string, body: UpdateCountryDto): Observable<CountryView> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'detail', +id], body);
    return this.httpService.update(req)
      .pipe(
        map(data => new CountryView(data))
      );
  }

  public deleteCountries(body: DeleteIdsDto): Observable<DeleteResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'delete-many'], {}, body)
    return this.httpService.deleteMany(req)
      .pipe(
        map(data => new DeleteResponse(data))
      );
  }
}
