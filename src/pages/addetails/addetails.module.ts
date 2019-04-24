import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddetailsPage } from './addetails';

@NgModule({
  declarations: [
    AddetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddetailsPage),
  ]
})
export class AddetailsPageModule {}
