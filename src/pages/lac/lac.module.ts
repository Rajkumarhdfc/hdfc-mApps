import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LacPage } from './lac';

@NgModule({
  declarations: [
    LacPage,
  ],
  imports: [
    IonicPageModule.forChild(LacPage),
  ]
})
export class LacPageModule {}
