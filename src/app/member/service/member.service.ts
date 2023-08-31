import {Injectable} from '@angular/core';
import {HttpClientService} from "../../shared/service/http-client.service";
import {map, Observable} from "rxjs";
import {BaseRequest} from "../../shared/type/http";
import {GetMemberUpdateDetailsResponse} from "../response/get-member-update-details.response";
import {UpdateMemberDetailsDto} from "../dto/update-member-details.dto";
import {UpdateMemberDetailsResponse} from "../response/update-member-details.response";
import {
  ConfirmUpdateEmailAddressDto,
  ConfirmUpdatePhoneNumberDto,
  UpdateEmailAddressOrPhoneNumberDto
} from "../dto/member.dto";
import {
  SendUpdateEmailAddressOrPhoneNumberVerificationCodeResponse
} from "../response/send-update-email-address-or-phone-number-verification-code.response";
import {UpdateEmailAddressOrPhoneNumberResponse} from "../response/update-email-address-or-phone-number.response";

@Injectable()
export class MemberService {

  private readonly BASE_PATH: string = "member";

  public constructor(private httpService: HttpClientService) { }

  public getDetails(): Observable<GetMemberUpdateDetailsResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'get-details']);
    return this.httpService.get(req)
      .pipe(
        map(data => new GetMemberUpdateDetailsResponse(data))
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

  public sendUpdatePhoneNumberCode(body: UpdateEmailAddressOrPhoneNumberDto): Observable<SendUpdateEmailAddressOrPhoneNumberVerificationCodeResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'send-update-email-address-phone-number-code'], null, { ...body });
    return this.httpService.post(req)
      .pipe(
        map(data => new SendUpdateEmailAddressOrPhoneNumberVerificationCodeResponse(data))
      );
  }

  public confirmUpdateEmailAddress(body: ConfirmUpdateEmailAddressDto): Observable<UpdateEmailAddressOrPhoneNumberResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'confirm-update-email-address'], null, { ...body });
    return this.httpService.update(req)
      .pipe(
        map(data => new UpdateEmailAddressOrPhoneNumberResponse(data))
      );
  }

  public confirmUpdatePhoneNumber(body: ConfirmUpdatePhoneNumberDto): Observable<UpdateEmailAddressOrPhoneNumberResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'confirm-update-phone-number'], null, { ...body });
    return this.httpService.update(req)
      .pipe(
        map(data => new UpdateEmailAddressOrPhoneNumberResponse(data))
      );
  }
}
