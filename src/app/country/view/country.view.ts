import {FleenHealthView} from "../../shared/view/fleen-health.view";

export class CountryView extends FleenHealthView  {

  public title: string | null;
  public code: string | null;

  public constructor(data: CountryView) {
    super(data);
    this.title = data?.title ? data.title : null;
    this.code = data?.code ? data.code : null;
  }
}
