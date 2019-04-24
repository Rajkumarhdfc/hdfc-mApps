import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocPage } from './doc';

@NgModule({
  declarations: [
    DocPage,
  ],
  imports: [
    IonicPageModule.forChild(DocPage),
  ],
})
export class DocPageModule {}
