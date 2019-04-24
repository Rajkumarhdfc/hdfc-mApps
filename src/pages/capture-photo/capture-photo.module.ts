import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CapturePhotoPage } from './capture-photo';
import { Camera,CameraOptions } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { Base64 } from '@ionic-native/base64';

@NgModule({
  declarations: [
    CapturePhotoPage,
  ],
  imports: [
    IonicPageModule.forChild(CapturePhotoPage),
  ],  providers: [
   
   Camera,
   Crop,
   Base64
  ]
})
export class CapturePhotoPageModule {}
