import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FuActionPage } from './fu-action';

@NgModule({
  declarations: [
    FuActionPage,
  ],
  imports: [
    IonicPageModule.forChild(FuActionPage),
  ],
})
export class FuActionPageModule {}
