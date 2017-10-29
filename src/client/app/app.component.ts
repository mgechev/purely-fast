import { Rnd } from './data/rnd-70-27-30';
import { ListGenerator, Entry } from './tree-generator.service';
import { Component, OnInit } from '@angular/core';
import './operators';
import { Names } from './names';
import { Sales } from './data/sales-70-27-30';

const NumRange: [number, number] = [27, 30];

@Component({
  moduleId: module.id,
  selector: 'sd-app',
  template: `
    <sd-list
      [data]="salesList"
      department="Sales"
      (add)="add(salesList, $event)"
      (remove)="remove(salesList, $event)"
    ></sd-list>

    <sd-list
      [data]="rndList"
      department="R&D"
      (add)="add(rndList, $event)"
      (remove)="remove(rndList, $event)"
    ></sd-list>
  `,
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  salesList: Entry[];
  rndList: Entry[];
  label: string;

  constructor(private generator: ListGenerator) {}

  ngOnInit() {
    this.salesList = Sales;
    this.rndList = Rnd;
  }

  add(list: Entry[], name: string) {
    list.unshift({ label: name, num: this.generator.generateNumber(NumRange) });
  }

  remove(list: Entry[], node: Entry) {
    list.splice(list.indexOf(node), 1);
  }
}
