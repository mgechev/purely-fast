import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { EmployeeData } from './../tree-generator.service';
import { List } from 'immutable';

@Component({
  moduleId: module.id,
  selector: 'sd-employee-list',
  template: `
    <h1 title="Department">{{ department }}</h1>

    <sd-name-input (post)="add.next($event)"></sd-name-input>

    <sd-list [data]="data" (remove)="remove.next($event)"></sd-list>
  `,
  styleUrls: ['employee-list.component.css']
})
export class EmployeeListComponent {
  @Input() data: List<EmployeeData>;
  @Input() department: string;

  @Output() remove = new EventEmitter<EmployeeData>();
  @Output() add = new EventEmitter<string>();
}
