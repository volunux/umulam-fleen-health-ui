import {Injectable} from '@angular/core';
import {HttpClientService} from "../../shared/service/http-client.service";
import {AnyProp} from "../../shared/type/base";
import {map, Observable} from "rxjs";
import {SearchResultView} from "../../shared/view/search-result.view";
import {CountryView} from "../../country/view/country.view";
import {BaseRequest} from "../../shared/type/http";
import {mapToSearchResult} from "../../shared/util/helpers";
import {AddCountryDto, UpdateCountryDto} from "../../country/dto/country.dto";
import {DeleteIdsDto} from "../../shared/type/other";
import {DeleteResponse} from "../../shared/response/delete.response";

@Injectable()
export class ProfessionalService {

  private readonly BASE_PATH: string = "professional";

  public constructor(private httpService: HttpClientService) { }

  public getDetails(params: AnyProp): Observable<SearchResultView<CountryView>> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'entries'], params);
    return this.httpService.get(req)
      .pipe(
        map(data => mapToSearchResult(CountryView, data))
      )
  }

  public findCountry(id: number | string): Observable<CountryView> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'detail', +id]);
    return this.httpService.getOne(req)
      .pipe(
        map(data => new CountryView(data))
      );
  }

  public saveCountry(body: AddCountryDto): Observable<CountryView> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'save'], null, { ...body });
    return this.httpService.post(req)
      .pipe(
        map(data => new CountryView(data))
      );
  }

  public updateCountry(id: number | string, body: UpdateCountryDto): Observable<CountryView> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'update', +id], null, { ...body });
    return this.httpService.update(req)
      .pipe(
        map(data => new CountryView(data))
      );
  }

  public deleteCountries(body: DeleteIdsDto): Observable<DeleteResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'delete-many'], null, { ...body })
    return this.httpService.deleteMany(req)
      .pipe(
        map(data => new DeleteResponse(data))
      );
  }

  public deleteAllCountries(): Observable<DeleteResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'delete-all']);
    return this.httpService.deleteMany(req)
      .pipe(
        map(data => new DeleteResponse(data))
      );
  }
}
