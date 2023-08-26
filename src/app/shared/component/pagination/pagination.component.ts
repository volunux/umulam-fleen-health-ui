import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  @Input('is-first') public isFirst: boolean | undefined;
  @Input('is-last') public isLast: boolean | undefined;
  @Input('current-page-number') public currentPageNumber: number = 0;
  @Output() public toNextPage: EventEmitter<void> = new EventEmitter<void>();
  @Output() public toPreviousPage: EventEmitter<void> = new EventEmitter<void>();

  public nextPage(): void {
    this.toNextPage.emit();
  }

  public previousPage(): void {
    this.toPreviousPage.emit();
  }

}
