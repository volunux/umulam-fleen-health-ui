import {Injectable} from '@angular/core';
import {HttpClientService} from "../../shared/service/http-client.service";
import {map, Observable} from "rxjs";
import {BaseRequest} from "../../shared/type/http";
import {CountryView} from "../view/country.view";
import {mapToSearchResult} from "../../shared/util/helpers";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private readonly BASE_PATH: string = "country";

  constructor(private httpService: HttpClientService) { }

  public findCountries(): Observable<any> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'entries'], {});
    return this.httpService.get(req)
      .pipe(
        map(data => mapToSearchResult<CountryView>(CountryView, data))
      )
  }
}
