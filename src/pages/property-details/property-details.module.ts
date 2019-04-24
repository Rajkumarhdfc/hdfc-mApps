import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PropertyDetailsPage } from './property-details';

@NgModule({
  declarations: [
    PropertyDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PropertyDetailsPage),
  ],
})
export class PropertyDetailsPageModule {}
