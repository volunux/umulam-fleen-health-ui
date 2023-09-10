import {Injectable} from '@angular/core';
import {HttpClientService} from "./http-client.service";
import {map, Observable} from "rxjs";
import {BaseRequest} from "../type/http";
import {SignedUrlResponse} from "../response/signed-url.response";

@Injectable()
export class SignedUrlService {

  private readonly BASE_PATH: string = "signed-url";

  public constructor(protected httpService: HttpClientService) { }

  public generateForProfilePhoto(fileName: string): Observable<SignedUrlResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'profile-photo'], { fileName });
    return this.httpService.get(req)
      .pipe(
        map(data => new SignedUrlResponse(data))
      );
  }

  public generateForProfileVerificationDocument(fileName: string): Observable<SignedUrlResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'profile-verification-document'], { fileName });
    return this.httpService.get(req)
      .pipe(
        map(data => new SignedUrlResponse(data))
      );
  }
}
