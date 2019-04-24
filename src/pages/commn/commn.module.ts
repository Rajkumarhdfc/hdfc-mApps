import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommnPage } from './commn';

@NgModule({
  declarations: [
    CommnPage,
  ],
  imports: [
    IonicPageModule.forChild(CommnPage),
  ],
  exports: [
    CommnPage
  ]

})
export class CommnPageModule {}
