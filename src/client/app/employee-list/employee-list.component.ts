import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { EmployeeData } from './../tree-generator.service';
import { List } from 'immutable';

const fibonacci = (num: number): number => {
  if (num === 1 || num === 2) {
    return 1;
  }
  return fibonacci(num - 1) + fibonacci(num - 2);
};

@Component({
  moduleId: module.id,
  selector: 'sd-employee-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 title="Department">{{ department }}</h1>

    <mat-form-field>
      <input placeholder="Enter name here" matInput type="text" [(ngModel)]="label" (keydown)="handleKey($event)">
    </mat-form-field>

    <mat-list>
      <div *ngIf="data.size === 0" class="empty-list-label">Empty list</div>
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
      <mat-divider *ngIf="data.size !== 0"></mat-divider>
    </mat-list>
  `,
  styleUrls: ['employee-list.component.css']
})
export class EmployeeListComponent {
  @Input() data: List<EmployeeData>;
  @Input() department: string;

  @Output() remove = new EventEmitter<EmployeeData>();
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
