import {FleenHealthView} from "../../shared/view/fleen-health.view";

export class VerificationDocumentView extends FleenHealthView {

  public filename: string;
  public link: string;
  public documentType: string;

  public constructor(data: VerificationDocumentView) {
    super(data);
    this.filename = data?.filename;
    this.link = data?.link;
    this.documentType = data?.documentType;
  }
}
