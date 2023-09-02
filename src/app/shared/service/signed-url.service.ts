import {Injectable} from '@angular/core';
import {HttpClientService} from "./http-client.service";
import {map, Observable} from "rxjs";
import {GetMemberUpdateDetailsResponse} from "../../member/response/get-member-update-details.response";
import {BaseRequest} from "../type/http";
import {UpdateMemberDetailsDto} from "../../member/dto/member.dto";
import {UpdateMemberDetailsResponse} from "../../member/response/update-member-details.response";
import {SignedUrlResponse} from "../response/signed-url.response";

@Injectable()
export class SignedUrlService {

  private readonly BASE_PATH: string = "signed-url";

  public constructor(private httpService: HttpClientService) { }

  public generateForProfilePhoto(fileName: string): Observable<SignedUrlResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'profile-photo'], { fileName });
    return this.httpService.get(req)
      .pipe(
        map(data => new SignedUrlResponse(data))
      );
  }

  public getUpdateDetails(): Observable<GetMemberUpdateDetailsResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'update-details']);
    return this.httpService.get(req)
      .pipe(
        map(data => new GetMemberUpdateDetailsResponse(data))
      );
  }

  public updateDetails(body: UpdateMemberDetailsDto): Observable<UpdateMemberDetailsResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'update-details'], null, { ...body });
    return this.httpService.update(req)
      .pipe(
        map(data => new UpdateMemberDetailsResponse(data))
      );
  }
}
