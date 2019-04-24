import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UniqueIdPage } from './unique-id';

@NgModule({
  declarations: [
    UniqueIdPage,
  ],
  imports: [
    IonicPageModule.forChild(UniqueIdPage),
  ],
})
export class UniqueIdPageModule {}
