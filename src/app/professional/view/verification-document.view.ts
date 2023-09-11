import {FleenHealthView} from "../../shared/view/fleen-health.view";

export class VerificationDocumentView extends FleenHealthView {

  public filename: string;
  public link: string;
  public downloadLink: string;
  public documentType: string;

  public constructor(data: VerificationDocumentView) {
    super(data);
    this.filename = data?.filename;
    this.link = data?.link;
    this.downloadLink = data?.downloadLink;
    this.documentType = data?.documentType;
  }
}
