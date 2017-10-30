import { DifferableList } from './../differable-list/differable-list';
import { List } from 'immutable';
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { EmployeeData } from '../tree-generator.service';

@Component({
  selector: 'sd-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-list>
    <div *ngIf="data.size === 0" class="empty-list-label">Empty list</div>
    <mat-list-item *ngFor="let item of data">
      <h3 matLine title="Name">
        {{ item.label }}
      </h3>
      <mat-chip-list>
        <md-chip title="Score" class="mat-chip mat-primary mat-chip-selected" color="primary" selected="true">
          {{ item.num | format }}
        </md-chip>
      </mat-chip-list>
      <i title="Delete" class="fa fa-trash-o" aria-hidden="true" (click)="remove.emit(item)"></i>
    </mat-list-item>
    <mat-divider *ngIf="data.size !== 0"></mat-divider>
  </mat-list>
  `,
  styles: [
    `
  mat-chip-list {
    margin-right: 15px;
  }
  `
  ]
})
export class ListComponent {
  @Input() data: DifferableList<EmployeeData>;
  @Output() remove = new EventEmitter<EmployeeData>();
}
