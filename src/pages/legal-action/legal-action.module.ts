import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LegalActionPage } from './legal-action';

@NgModule({
  declarations: [
    LegalActionPage,
  ],
  imports: [
    IonicPageModule.forChild(LegalActionPage),
  ],
})
export class LegalActionPageModule {}
