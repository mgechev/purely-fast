import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { ListModule } from './list/list.module';
import { ListGenerator } from './tree-generator.service';

console.log(require('lodash.memoize'));
console.log(require('immutable'));

@NgModule({
  imports: [BrowserModule, ListModule],
  providers: [ListGenerator],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
