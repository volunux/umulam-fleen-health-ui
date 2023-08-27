import {ActivatedRoute, Router} from "@angular/router";
import {BaseUpdateComponent} from "../base-update/base-update.component";

export abstract class BaseDetailComponent extends BaseUpdateComponent<any> {

  protected constructor(router: Router,
                        route: ActivatedRoute) {
    super(router, route);
  }

  protected override initForm(): void { }
  
}
