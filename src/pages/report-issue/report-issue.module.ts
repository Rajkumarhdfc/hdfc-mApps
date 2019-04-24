import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportIssuePage } from './report-issue';

@NgModule({
  declarations: [
    ReportIssuePage,
  ],
  imports: [
    IonicPageModule.forChild(ReportIssuePage),
  ],
})
export class ReportIssuePageModule {}
