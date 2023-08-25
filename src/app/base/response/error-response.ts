import {AnyProp} from "../../shared/type/base";

export class ErrorResponse {

  public message!: string;
  public status?: number;
  public timestamp?: Date;
  public type?: string | null;
  public fields?: AnyProp[];
  public path?: string | null;

  public constructor(data: ErrorResponse) {
    this.message = data?.message ? data?.message : '';
    this.status = data?.status;
    this.type = data?.type ? data?.type : null;
    this.timestamp = (data?.timestamp ? new Date(data?.timestamp) : new Date());
    this.fields = data?.fields ? data?.fields : [];
    this.path = data?.path ? data?.path : null;
  }

}
