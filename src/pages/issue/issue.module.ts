import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IssuePage } from './issue';

@NgModule({
  declarations: [
    IssuePage,
  ],
  imports: [
    IonicPageModule.forChild(IssuePage),
  ],
})
export class IssuePageModule {}
