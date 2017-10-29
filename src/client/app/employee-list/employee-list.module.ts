import { FormatPipe } from './format.pipe';
import { ListComponent } from './list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule, MatCommonModule, MatChipsModule } from '@angular/material';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

import { EmployeeListComponent } from './employee-list.component';
import { NameInputComponent } from './name-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCommonModule,
    MatChipsModule
  ],
  declarations: [EmployeeListComponent, NameInputComponent, ListComponent, FormatPipe],
  exports: [EmployeeListComponent]
})
export class EmployeeListModule {}
