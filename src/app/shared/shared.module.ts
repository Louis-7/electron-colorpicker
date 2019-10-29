import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSliderModule } from '@angular/material/slider';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    MatSliderModule,
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    MatSliderModule,
  ],
})
export class SharedModule { }
