import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewDocPage } from './view-doc';
import { FileOpener } from '@ionic-native/file-opener';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
@NgModule({
  declarations: [
    ViewDocPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewDocPage),
  ],
  providers: [
    File,
    FileOpener,
    FilePath
  ]
})
export class ViewDocPageModule {}
