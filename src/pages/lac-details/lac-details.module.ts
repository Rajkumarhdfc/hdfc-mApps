import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LacDetailsPage } from './lac-details';
import { TooltipsModule } from 'ionic-tooltips';

@NgModule({
  declarations: [
    LacDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(LacDetailsPage),
    TooltipsModule.forRoot()
  ],
})
export class LacDetailsPageModule {}
