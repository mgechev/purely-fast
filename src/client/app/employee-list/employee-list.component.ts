import { DifferableListDiffer, DifferableListDifferFactory } from './../differable-list/differable-list-differ';
import { DifferableList } from './../differable-list/differable-list';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  IterableDiffers,
  IterableDiffer
} from '@angular/core';

import { EmployeeData } from './../tree-generator.service';
import { List } from 'immutable';

@Component({
  moduleId: module.id,
  selector: 'sd-employee-list',
  providers: [IterableDiffers.extend([new DifferableListDifferFactory()])],
  template: `
    <h1 title="Department">{{ department }}</h1>

    <sd-name-input (post)="add.next($event)"></sd-name-input>

    <sd-list [data]="data" (remove)="remove.next($event)"></sd-list>
  `,
  styleUrls: ['employee-list.component.css']
})
export class EmployeeListComponent {
  @Input() data: DifferableList<EmployeeData>;
  @Input() department: string;

  @Output() remove = new EventEmitter<EmployeeData>();
  @Output() add = new EventEmitter<string>();
}
