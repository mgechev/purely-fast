import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Entry } from './../tree-generator.service';

const fibonacci = (num: number): number => {
  if (num === 1 || num === 2) {
    return 1;
  }
  return fibonacci(num - 1) + fibonacci(num - 2);
};

@Component({
  moduleId: module.id,
  selector: 'sd-list',
  template: `
    <h1 title="Department">{{ department }}</h1>

    <mat-form-field>
      <input placeholder="Enter name here" matInput type="text" [(ngModel)]="label" (keydown)="handleKey($event)">
    </mat-form-field>

    <mat-list>
      <div *ngIf="data.length === 0" class="empty-list-label">Empty list</div>
      <mat-list-item *ngFor="let item of data">
        <h3 matLine title="Name">
          {{ item.label }}
        </h3>
        <mat-chip-list>
          <md-chip title="Score" class="mat-chip mat-primary mat-chip-selected" color="primary" selected="true">
            {{ format(item.num) }}
          </md-chip>
        </mat-chip-list>
        <i title="Delete" class="fa fa-trash-o" aria-hidden="true" (click)="remove.emit(item)"></i>
      </mat-list-item>
      <mat-divider *ngIf="data.length !== 0"></mat-divider>
    </mat-list>
  `,
  styleUrls: ['list.component.css']
})
export class ListComponent {
  @Input() data: Entry[];
  @Input() department: string;

  @Output() remove = new EventEmitter<Entry>();
  @Output() add = new EventEmitter<string>();

  label: string;

  handleKey(event: any) {
    if (event.keyCode === 13) {
      this.add.emit(this.label);
      this.label = '';
    }
  }

  format(num: number) {
    return fibonacci(num);
  }
}
