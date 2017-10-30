import { Component, OnInit } from '@angular/core';
import { List } from 'immutable';

import { ListGenerator, EmployeeData } from './tree-generator.service';
import { Names } from './names';
import './operators';

import { Rnd } from './data/rnd-70-27-30';
import { Sales } from './data/sales-70-27-30';
import { DifferableList } from './differable-list/differable-list';

const NumRange: [number, number] = [27, 30];

@Component({
  moduleId: module.id,
  selector: 'sd-app',
  template: `
    <sd-employee-list
      [data]="salesList"
      department="Sales"
      (add)="salesList = add(salesList, $event)"
      (remove)="salesList = remove(salesList, $event)"
    ></sd-employee-list>

    <sd-employee-list
      [data]="rndList"
      department="R&D"
      (add)="rndList = add(rndList, $event)"
      (remove)="rndList = remove(rndList, $event)"
    ></sd-employee-list>
  `,
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  salesList: DifferableList<EmployeeData>;
  rndList: DifferableList<EmployeeData>;
  label: string;

  constructor(private generator: ListGenerator) {}

  ngOnInit() {
    this.salesList = DifferableList.fromArray(Sales);
    this.rndList = DifferableList.fromArray(Rnd);
  }

  add(list: List<EmployeeData>, name: string) {
    return list.unshift({ label: name, num: this.generator.generateNumber(NumRange) });
  }

  remove(list: List<EmployeeData>, node: EmployeeData) {
    return list.splice(list.indexOf(node), 1);
  }
}
