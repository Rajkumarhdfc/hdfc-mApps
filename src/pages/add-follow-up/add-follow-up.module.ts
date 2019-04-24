import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddFollowUpPage } from './add-follow-up';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AddFollowUpPage,
  ],
  imports: [
    IonicPageModule.forChild(AddFollowUpPage),
  ],
  providers:
  [
    DatePipe
  ]
})
export class AddFollowUpPageModule {}
