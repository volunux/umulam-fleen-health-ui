import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-row-entry-option',
  templateUrl: './row-entry-option.component.html',
  styleUrls: ['./row-entry-option.component.css']
})
export class RowEntryOptionComponent {

  @Input('entry-id') entryId!: number;
  @Output() detailClicked: EventEmitter<number> = new EventEmitter<number>();
  @Output() updateClicked: EventEmitter<number> = new EventEmitter<number>();
  @Output() checkedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  viewDetail() {
    this.detailClicked.emit(this.entryId);
  }

  updateEntry() {
    this.updateClicked.emit(this.entryId);
  }

  handleChecked(checked: boolean) {
    this.checkedChanged.emit(checked);
  }
}
