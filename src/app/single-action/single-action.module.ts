import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleActionPageRoutingModule } from './single-action-routing.module';

import { SingleActionPage } from './single-action.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleActionPageRoutingModule
  ],
  declarations: [SingleActionPage]
})
export class SingleActionPageModule {}
