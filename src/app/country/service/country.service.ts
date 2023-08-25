import {Injectable} from '@angular/core';
import {HttpClientService} from "../../shared/service/http-client.service";
import {Observable} from "rxjs";
import {BaseRequest} from "../../shared/type/http";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private readonly BASE_PATH: string = "country";

  constructor(private httpService: HttpClientService) { }

  public findCountries(): Observable<any> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'entries'], {});
    return this.httpService.get(req);
  }
}
