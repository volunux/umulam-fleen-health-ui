import {Component, OnInit} from '@angular/core';
import {ProfessionalService} from "../../service/professional.service";
import {BaseComponent} from "../../../base/component/base/base.component";
import {ProfessionalView} from "../../view/professional.view";
import {ErrorResponse} from "../../../base/response/error-response";

@Component({
  selector: 'app-professional-get-details',
  templateUrl: './professional-get-details.component.html',
  styleUrls: ['./professional-get-details.component.css']
})
export class ProfessionalGetDetailsComponent extends BaseComponent implements OnInit {

  public constructor(protected professionalService: ProfessionalService) {
    super();
  }

  public ngOnInit(): void {
    this.professionalService.getDetails()
      .subscribe({
        next: (result: ProfessionalView): void => {

        },
        error: (error: ErrorResponse): void => {
          console.log(error);
        }
    });
  }


}
