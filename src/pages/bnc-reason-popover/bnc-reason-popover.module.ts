import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BncReasonPopoverPage } from './bnc-reason-popover';

@NgModule({
  declarations: [
    BncReasonPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(BncReasonPopoverPage),
  ],
})
export class BncReasonPopoverPageModule {}
