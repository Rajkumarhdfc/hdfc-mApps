import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseMpinPage } from './choose-mpin';

@NgModule({
  declarations: [
    ChooseMpinPage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseMpinPage),
  ],
})
export class ChooseMpinPageModule {}
