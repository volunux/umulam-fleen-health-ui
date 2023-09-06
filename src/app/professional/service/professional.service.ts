import {Injectable} from '@angular/core';
import {HttpClientService} from "../../shared/service/http-client.service";
import {map, Observable} from "rxjs";
import {BaseRequest} from "../../shared/type/http";
import {ProfessionalView} from "../view/professional.view";

@Injectable()
export class ProfessionalService {

  private readonly BASE_PATH: string = "professional";

  public constructor(private httpService: HttpClientService) { }

  public getDetails(): Observable<ProfessionalView> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'get-details']);
    return this.httpService.get(req)
      .pipe(
        map(data => new ProfessionalView(data))
      )
  }


}
