import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommnDetailsPage } from './commn-details';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Geolocation } from '@ionic-native/geolocation';
@NgModule({
  declarations: [
    CommnDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(CommnDetailsPage),
  ],
  providers:[
    Geolocation,
    LaunchNavigator
  ]
})
export class CommnDetailsPageModule {}
