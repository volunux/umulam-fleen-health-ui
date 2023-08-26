import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-row-entry-option',
  templateUrl: './row-entry-option.component.html',
  styleUrls: ['./row-entry-option.component.css']
})
export class RowEntryOptionComponent {

  @Input('entry-id') public entryId!: number;
  @Output() public detailClicked: EventEmitter<number> = new EventEmitter<number>();
  @Output() public updateClicked: EventEmitter<number> = new EventEmitter<number>();
  @Output() public checkedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  public viewDetail(): void {
    this.detailClicked.emit(this.entryId);
  }

  public updateEntry(): void {
    this.updateClicked.emit(this.entryId);
  }

  public handleChecked(checked: boolean): void {
    this.checkedChanged.emit(checked);
  }
}
