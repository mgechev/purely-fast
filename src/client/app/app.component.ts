import { Component, OnInit } from '@angular/core';
import { List } from 'immutable';

import { ListGenerator, Entry } from './tree-generator.service';
import { Names } from './names';
import './operators';

import { Rnd } from './data/rnd-70-27-30';
import { Sales } from './data/sales-70-27-30';

const NumRange: [number, number] = [27, 30];

@Component({
  moduleId: module.id,
  selector: 'sd-app',
  template: `
    <sd-list
      [data]="salesList"
      department="Sales"
      (add)="salesList = add(salesList, $event)"
      (remove)="salesList = remove(salesList, $event)"
    ></sd-list>

    <sd-list
      [data]="rndList"
      department="R&D"
      (add)="rndList = add(rndList, $event)"
      (remove)="rndList = remove(rndList, $event)"
    ></sd-list>
  `,
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  salesList: List<Entry>;
  rndList: List<Entry>;
  label: string;

  constructor(private generator: ListGenerator) {}

  ngOnInit() {
    this.salesList = List(Sales);
    this.rndList = List(Rnd);
  }

  add(list: List<Entry>, name: string) {
    return list.unshift({ label: name, num: this.generator.generateNumber(NumRange) });
  }

  remove(list: List<Entry>, node: Entry) {
    return list.splice(list.indexOf(node), 1);
  }
}
