import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sd-name-input',
  template: `
    <mat-form-field>
      <input placeholder="Enter name here" matInput type="text" [(ngModel)]="label" (keydown)="handleKey($event)">
    </mat-form-field>
  `,
  styles: [
    `
    mat-form-field {
      margin-left: 15px;
      width: calc(100% - 30px);
    }
  `
  ]
})
export class NameInputComponent {
  label: string;
  @Output() post = new EventEmitter<string>();

  handleKey(event: any) {
    if (event.keyCode === 13) {
      this.post.emit(this.label);
      this.label = '';
    }
  }
}
