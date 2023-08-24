import {AnyProp} from "../../shared/type/base";

export class ErrorResponse {

  public message!: string;
  public status?: number;
  public timestamp?: Date;
  public type?: string;
  public fields?: AnyProp[];
  public path?: string;

  public constructor(data: ErrorResponse) {
    this.message = data?.message;
    this.status = data?.status;
    this.type = data?.type;
    this.timestamp = (data?.timestamp ? new Date(data?.timestamp) : new Date());
    this.fields = data?.fields;
    this.path = data?.path;
  }

}
