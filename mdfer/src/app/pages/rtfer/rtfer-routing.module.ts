import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RtferPage } from './rtfer.page';

const routes: Routes = [
  {
    path: '',
    component: RtferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RtferPageRoutingModule {}
