import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-entries-delete-all',
  templateUrl: './entries-delete-all.component.html',
  styleUrls: ['./entries-delete-all.component.css']
})
export class EntriesDeleteAllComponent {

  @Output('delete-all') public deleteAll: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input('is-entries-available') public isEntriesAvailable: boolean = false;
  @Input('is-submitting') public isSubmitting: boolean = false;

  public confirmDeleteAll(): void {
    this.deleteAll.emit(true);
  }

}
