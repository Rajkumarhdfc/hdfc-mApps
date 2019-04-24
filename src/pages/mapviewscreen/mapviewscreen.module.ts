import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapviewscreenPage } from './mapviewscreen';
import { LaunchNavigator,LaunchNavigatorOptions} from '@ionic-native/launch-navigator';
import { Geolocation } from '@ionic-native/geolocation';
import { GetLatLongProvider } from '../../providers/get-lat-long/get-lat-long';
@NgModule({
  declarations: [
    MapviewscreenPage,
  ],
  imports: [
    IonicPageModule.forChild(MapviewscreenPage),
  ],
  providers:
  [
    LaunchNavigator,
    Geolocation,
    GetLatLongProvider

  ]
})
export class MapviewscreenPageModule {}
