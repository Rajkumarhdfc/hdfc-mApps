import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DisbursementPage } from './disbursement';

@NgModule({
  declarations: [
    DisbursementPage,
  ],
  imports: [
    IonicPageModule.forChild(DisbursementPage),
  ],
})
export class DisbursementPageModule {}
