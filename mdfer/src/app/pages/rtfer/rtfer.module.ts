import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RtferPageRoutingModule } from './rtfer-routing.module';

import { RtferPage } from './rtfer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RtferPageRoutingModule
  ],
  declarations: [RtferPage]
})
export class RtferPageModule {}
