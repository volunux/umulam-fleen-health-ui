import {Component, OnInit} from '@angular/core';
import {ProfessionalService} from "../../service/professional.service";
import {BaseComponent} from "../../../base/component/base/base.component";
import {ProfessionalView} from "../../view/professional.view";
import {ErrorResponse} from "../../../base/response/error-response";
import {ActivatedRoute, Router} from "@angular/router";
import {ErrorType} from "../../../shared/constant/error-constant";
import {isTruthy, nonNull, normalizeName} from "../../../shared/util/helpers";
import {FileUploadDownloadService} from "../../../shared/service/file-upload-download.service";
import {S3Service} from "../../../shared/service/s3.service";

@Component({
  selector: 'app-professional-get-details',
  templateUrl: './professional-get-details.component.html',
  styleUrls: ['./professional-get-details.component.css']
})
export class ProfessionalGetDetailsComponent extends BaseComponent implements OnInit {
  public entryView!: ProfessionalView;
  protected readonly normalizeName = normalizeName;

  public constructor(protected professionalService: ProfessionalService,
                     protected fileService: FileUploadDownloadService,
                     protected s3Service: S3Service,
                     protected router: Router,
                     protected route: ActivatedRoute) {
    super();
  }

  public ngOnInit(): void {
    this.professionalService.getDetails()
      .subscribe({
        next: (result: ProfessionalView): void => {
          this.entryView = result;
        },
        error: async (error: ErrorResponse): Promise<void> => {
          if (error.type === ErrorType.NO_PROFILE) {
            return await this.updateDetails();
          }
          this.handleError(error);
        }
    });
  }

  public async updateDetails(): Promise<void> {
    await this.router.navigate(['..', 'update-details'], {relativeTo: this.route});
  }

  public viewFile(link: string): void {
    if (isTruthy(link)) {
      this.fileService.downloadFile(link, this.s3Service.getObjectKeyFromSignedUrl(link) as string)
        .subscribe();
    }
  }

  get professionalView(): ProfessionalView {
    return this.entryView;
  }


}
