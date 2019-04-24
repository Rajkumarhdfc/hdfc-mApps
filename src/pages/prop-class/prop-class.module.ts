import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PropClassPage } from './prop-class';

@NgModule({
  declarations: [
    PropClassPage,
  ],
  imports: [
    IonicPageModule.forChild(PropClassPage),
  ],
})
export class PropClassPageModule {}
